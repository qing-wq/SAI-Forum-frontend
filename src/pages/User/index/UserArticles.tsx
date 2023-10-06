import React, { MouseEventHandler, useState } from "react";
import { UserInfo } from "@/models/index";
import { useNavigate } from "react-router-dom";
import { HomeSelectType } from "@/apis/user";
import { articleInteraction } from "@/apis/articles";

type UserArticlesProp = {
	articles: UserInfo["homeSelectList"];
	tab: HomeSelectType;
};

/** 用户文章列表页 */
export default function UserArticles({ articles, tab }: UserArticlesProp) {
	const navigate = useNavigate();
	const openArticle = (id: number) => {
		navigate("/article/" + id);
	};
	return (
		<div className=''>
			{/* <div className='flex px-4 h-10 leading-10 rounded-t-xl border-solid border-b-2 border-opacity-50 border-b-primary'>
				<div className='text-center w-24 font-black hover:text-primary border-b-2'>
					动态
				</div>
				<div className='text-center w-24 font-black'>文章</div>
				<div className='text-center w-24 font-black'>专栏</div>
				<div className='text-center w-24 font-black'>收藏</div>
			</div> */}
			{articles.list.map((article) => (
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
				<div className={`pl-5 ${article.cover ? "" : "hidden"}`}>
					<img
						className=' inline-block max-h-24 rounded-md'
						src={article.cover}
						alt='文章封面'
					/>
				</div>
				{/* interaction */}
				<div
					className={`pl-5 h-full ${
						article.cover ? "" : ""
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
