import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import MiddleView from "../../layouts/MiddleView";
import MoreLoading from "../../components/MoreLoading";

import SVG from "../../svg";
import { HomeData } from "@/models";
import ArticleDTO from "@/models/article/ArticleDTO.model";
import numberFormat from "@/utils/numberFormat";
import { getArticlesPerPage } from "@/apis/articles";
import useCategorysStore from "@/stores/useCategorysStore";
import UserAvatar from "@/components/UserAvatar";

type ArticlesProp = {
	homeData: {
		read: () => HomeData;
	};
	category: string;
};

/**
 * 文章列表
 */
export default memo(function Articles({ homeData, category }: ArticlesProp) {
	const data = homeData.read();
	const { list, hasMore: more } = data.articles;
	// 分类
	const getCategoryId = useCategorysStore((state) => state.getCategoryId);
	// 当前分类的文章列表
	const [articles, setArticles] = useState(list);
	// 当前文章页数
	const [page, setPage] = useState<number>(1);
	// 是否有更多文章
	const [hasMore, setHasMore] = useState<boolean>(more);
	// 首页数据更新时重置
	useEffect(() => {
		setArticles(list);
		setHasMore(more);
		setPage(1);
	}, [list, more]);
	/** 加载更多文章 */
	const loadMoreArticles = async () => {
		const nextPage = page + 1;
		const articlesListInfo = await getArticlesPerPage(
			getCategoryId(category),
			nextPage
		);
		setArticles((articles) => [...articles, ...articlesListInfo.list]);
		setHasMore(articlesListInfo.hasMore);
		setPage(nextPage);
	};
	return (
		<MiddleView>
			{articles.map((article) => (
				<ArticleItem key={article.articleId} article={article} />
			))}
			<div
				key={"osdosd"}
				className=' w-full h-[30px] leading-7 bg-purple-200 bg-opacity-10'
			>
				{!hasMore ? (
					<div className='w-full text-center leading-8'>
						没有更多了
					</div>
				) : (
					<LoadMoreArticle loadHandler={loadMoreArticles} />
				)}
			</div>
		</MiddleView>
	);
});

type ArticleItemProp = {
	article: ArticleDTO;
};
/**
 * 文章子项
 */
function ArticleItem({ article }: ArticleItemProp) {
	const navigate = useNavigate();
	const openArticleDetail = (id: number) => {
		navigate(`/article/${id}`);
	};
	const openAuthorDetail = (id: number) => {
		navigate(`/user/${id}`);
	};
	const clickAuthor = (authorId: number, e: React.MouseEvent) => {
		e.stopPropagation();
		openAuthorDetail(authorId);
	};
	return (
		<div
			className='m-auto w-full  px-1/12  hover:bg-gray-200 hover:bg-opacity-40 pt-7 pb-4 group cursor-pointer'
			onClick={() => openArticleDetail(article.articleId)}
		>
			<div className='flex'>
				{/* text */}
				<div className='flex-1'>
					<h1 className='line-clamp-1 text-2xl group-hover:text-primary-focus mb-3'>
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
						alt='cover'
					/>
				</div>
			</div>
			{/* 信息行1 */}
			<div className='flex  h-10 items-center justify-between whitespace-nowrap'>
				{/* author */}
				<div
					className='flex gap-3 items-center max-h-md hover:text-primary-focus'
					onClick={(e) => {
						clickAuthor(article.author, e);
					}}
				>
					<div className='flex gap-3'>
						<UserAvatar src={article.authorAvatar} />
						<p>{article.authorName}</p>
					</div>
				</div>

				{/* tags */}
				<div className=' inline-flex gap-1 overflow-hidden'>
					{article.tags.map((tag) => (
						<span key={tag.tagId} className='badge'>
							{tag.tag}
						</span>
					))}
				</div>
			</div>
			{/* 信息行2 */}
			<div className='flex gap-1 h-10 items-center justify-between whitespace-nowrap'>
				{/* time */}
				<p className=' text-gray-500 hidden xl:inline'>
					{formatTime(article.createTime)}
				</p>
				{/* counts */}
				<CountView count={article.count} />
			</div>
		</div>
	);
}

function formatTime(time: string) {
	const date = new Date(time);
	const str =
		date.getFullYear() +
		"年" +
		(date.getMonth() + 1) +
		"月" +
		date.getDay() +
		"日 " +
		date.getHours() +
		":" +
		date.getMinutes() +
		":" +
		date.getSeconds();
	return str;
}

type CountViewProp = {
	count: HomeData["articles"]["list"][number]["count"];
};
function CountView({ count }: CountViewProp) {
	return (
		<div className=' leading-10  flex whitespace-nowrap gap-3 group-hover:text-primary-focus'>
			<span className='flex items-center'>
				<SVG name='handThumbUp' />
				<p>{numberFormat(count.praiseCount)}</p>
			</span>
			<span className='flex items-center'>
				<SVG name='eye' />
				<p>{numberFormat(count.readCount)}</p>
			</span>
			<span className='flex items-center'>
				<SVG name='star' />
				<p>{numberFormat(count.collectionCount)}</p>
			</span>
			<span className='flex items-center'>
				<SVG name='chat' />
				<p>{numberFormat(count.commentCount)}</p>
			</span>
		</div>
	);
}

type LoadMoreArticleProp = {
	loadHandler: Function;
};
/**
 * 滚动加载指示
 */
function LoadMoreArticle({ loadHandler }: LoadMoreArticleProp) {
	const moreLoading = useRef<HTMLDivElement>(null);
	const [io, setIo] = useState(
		new IntersectionObserver((e) => {
			console.log(e, e[0].intersectionRatio > 0 ? "出现" : "消失");
			if (e[0].intersectionRatio > 0) {
				// 加载事件
				loadHandler();
			}
		})
	);
	useEffect(() => {
		setIo(
			new IntersectionObserver((e) => {
				if (e[0].intersectionRatio > 0) {
					// 加载事件
					loadHandler();
				}
			})
		);
	}, [loadHandler]);
	useEffect(() => {
		if (moreLoading.current) io.observe(moreLoading.current);
		return () => {
			if (moreLoading.current) io.unobserve(moreLoading.current);
		};
	}, [moreLoading.current, io]);
	// TODO: 这个ref有个奇怪的报错...
	return <MoreLoading ref={moreLoading} />;
}
