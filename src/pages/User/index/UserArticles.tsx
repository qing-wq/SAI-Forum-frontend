import React, { MouseEventHandler, useEffect, useState } from "react";
import { UserInfo } from "@/models/index";
import { useNavigate } from "react-router-dom";
import { HomeSelectType } from "@/apis/user";
import { articleInteraction } from "@/apis/articles";
import LoadPerPage from "@/components/LoadPerPage";
import ArticleDTO from "@/models/article/ArticleDTO.model";
import PageListVo from "@/models/page/PageListVo.model";

type UserArticlesProp = {
	articles: UserInfo["homeSelectList"];
	tab: HomeSelectType;
	loadFunc: (page: number) => Promise<PageListVo<ArticleDTO>>;
};

/** 用户文章列表页 */
export default function UserArticles({
	articles,
	tab,
	loadFunc,
}: UserArticlesProp) {
	const navigate = useNavigate();
	const [ended, setEnded] = useState<boolean>(!articles.hasMore);
	const [articlesList, setArticlesList] = useState<ArticleDTO[]>(
		articles.list
	);
	const [curPage, setCurPage] = useState<number>(1);
	useEffect(() => {
		setArticlesList(articles.list);
		setEnded(!articles.hasMore);
		setCurPage(1);
	}, [articles]);
	const openArticle = (id: number) => {
		navigate("/article/" + id);
	};
	return (
		<div className=''>
			{articlesList.map((article) => (
				<Article
					key={article.articleId}
					article={article}
					onClick={() => {
						openArticle(article.articleId);
					}}
				>
					<ArticleInteraction
						articleId={article.articleId}
						tab={tab}
					/>
				</Article>
			))}
			<LoadPerPage
				ended={ended}
				successShow={<div>没有更多了</div>}
				loadFunc={async () => {
					const res = await loadFunc(curPage + 1);
					setArticlesList(articlesList.concat(res.list));
					setEnded(!res.hasMore);
				}}
			>
				加载中...
			</LoadPerPage>
		</div>
	);
}

type ArticleProp = {
	article: UserArticlesProp["articles"]["list"][number];
	onClick?: MouseEventHandler<HTMLDivElement>;
	children?: React.ReactNode;
};

function Article({ article, onClick, children }: ArticleProp) {
	return (
		<div className='w-full h-32 p-4  border-solid border-b-[1px] border-opacity-10 border-b-black bg-base-100'>
			<div className='flex h-full'>
				{/* text */}
				<div className='flex-1'>
					<h1
						className='line-clamp-1 text-2xl hover:text-primary-focus mb-3 cursor-pointer'
						onClick={onClick}
					>
						{article.title}
					</h1>
					<p className='line-clamp-2 text-gray-700'>
						{article.summary}
					</p>
				</div>
				{/* cover */}
				<div className={`pl-5 ${article.picture ? "" : "hidden"}`}>
					<img
						className=' inline-block max-h-24 rounded-md'
						src={article.picture}
						alt='文章封面'
					/>
				</div>
				{/* interaction */}
				<div
					className={`pl-5 h-full ${
						article.picture ? "" : ""
					} flex items-center`}
				>
					{children}
				</div>
			</div>
		</div>
	);
}

const ArticleInteraction = ({
	articleId,
	tab,
}: {
	articleId: number;
	tab: HomeSelectType;
}) => {
	const [isCollection, setIsCollection] = useState<boolean>(true);
	if (tab === "collection")
		return (
			<div
				className={`btn ${
					isCollection ? "btn-warning" : "btn-primary"
				} btn-sm text-white`}
				onClick={async () => {
					try {
						await articleInteraction(
							articleId,
							isCollection ? 5 : 3
						);
					} catch (e) {
						return console.log(e);
					}
					return setIsCollection((isCollection) => !isCollection);
				}}
			>
				{isCollection ? "取消收藏" : "收藏文章"}
			</div>
		);

	return null;
};
