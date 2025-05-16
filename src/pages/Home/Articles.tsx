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
import dayjs from "dayjs";

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
	const purpleTheme = 'rgba(124, 58, 237, 0.05)'; // 紫色主题背景
	const pinkAccent = '#ff1aff'; // 粉色强调色

	return (
		<div className='space-y-0'>
			{articles.map((article) => (
				<ArticleItem key={article.articleId} article={article} />
			))}
			<div
				key={"osdosd"}
				className='w-full h-full rounded-lg'
				style={{ background: purpleTheme }}
			>
				{articles.length === 0 ? (
					<div className='w-full h-full text-center py-8 text-gray-500'>
						这里没有东西噢
					</div>
				) : !hasMore ? (
					<>
						<div className='divider m-0 h-0' />
						<div className='w-full h-12 text-center leading-12 text-gray-500 py-3'>
							没有更多了
						</div>
					</>
				) : (
					<LoadMoreArticle loadHandler={loadMoreArticles} />
				)}
			</div>
		</div>
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
			className='m-auto w-full px-8 bg-white shadow-sm pt-5 pb-2 group cursor-pointer border border-transparent border-b-purple-100 hover:bg-[#f7f5fe] transition-colors duration-300'
			onClick={() => openArticleDetail(article.articleId)}
		>
			<div className='flex'>
				{/* text */}
				<div className='flex-1'>
					<h1 className='line-clamp-1 text-xl font-medium group-hover:text-[#7c3aed] mb-2 transition-colors'>
						{article.title}
					</h1>
					<p className='line-clamp-2 text-gray-700 text-sm'>
						{article.summary}
					</p>
				</div>
				{/* cover */}
				<div className={`pl-5 ${article.picture ? "" : "hidden"}`}>
					<img
						className='inline-block max-h-24 w-44 rounded-md shadow-sm transition-all duration-300'
						src={article.picture}
						alt='cover'
					/>
				</div>
			</div>
			{/* 信息行1 */}
			<div className='flex h-8 items-center justify-between whitespace-nowrap mt-4'>
				{/* author */}
				<div
					className='flex gap-3 items-center max-h-md transition-colors duration-300'
					onClick={(e) => {
						clickAuthor(article.author, e);
					}}
				>
					<div className='flex gap-1 items-center'>
						<UserAvatar src={article.authorAvatar} />
						<p className='text-sm text-gray-700 hover:text-[#ff1aff]'>{article.authorName}</p>
					</div>
				</div>

				{/* tags */}
				<div className='z inline-flex gap-1 overflow-hidden'>
					{article.tags.map((tag) => (
						<span key={tag.tagId} className='badge badge-outline text-[#7c3aed] border-[#7c3aed] bg-purple-50 hover:bg-purple-100 transition-colors duration-300'>
							{tag.tag}
						</span>
					))}
				</div>
			</div>
			{/* 信息行2 */}
			<div className='flex gap-1 h-8 items-center justify-between whitespace-nowrap'>
				{/* time */}
				<p className='text-gray-500 hidden xl:inline text-sm'>
					{dayjs(article.createTime).format(
						"YYYY年MM月DD日 HH:mm:ss"
					)}
				</p>
				{/* counts */}
				<CountView count={article.count} />
			</div>
		</div>
	);
}

type CountViewProp = {
	count: HomeData["articles"]["list"][number]["count"];
};
function CountView({ count }: CountViewProp) {
	return (
		<div className='leading-10 flex whitespace-nowrap gap-4 text-gray-700'>
			<span className='flex items-center gap-1'>
				<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
				</svg>
				<p>{numberFormat(count.praiseCount)}</p>
			</span>
			<span className='flex items-center gap-1'>
				<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
				</svg>
				<p>{numberFormat(count.readCount)}</p>
			</span>
			<span className='flex items-center gap-1'>
				<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
				</svg>
				<p>{numberFormat(count.collectionCount)}</p>
			</span>
			<span className='flex items-center gap-1'>
				<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
				</svg>
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
