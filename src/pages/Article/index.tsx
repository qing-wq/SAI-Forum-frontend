import React, { useState, useEffect, memo } from "react";
import { useParams } from "react-router-dom";
import MiddleViewVertical from "../../layouts/MiddleViewVertical";
import "github-markdown-css";
import { MarkdownViewer } from "@/components/Markdown";
import { RelationalFunc } from "@/components/UserInfo";
import useArticleViewStore from "@/stores/useArticleViewStore";
import UserAvatar from "@/components/UserAvatar";
import dayjs from "dayjs";
import ArticleDTO from "@/models/article/ArticleDTO.model";
import UserStatisticInfoDTO from "@/models/user/UserStatisticInfoDTO.model";
import ArticleInteractionBlock from "./ArticleInteractionBlock";
import CommentsBlock from "./CommentsBlock";
import Toc from "@/components/Markdown/Toc";
import useAuth from "@/auth/useAuth";
import useAuthTo from "@/auth/useAuthTo";

/**
 * 文章详情页（展示）
 */
export default memo(function Article() {
	const { id } = useParams();
	const {
		articleInfo,
		authorInfo,
		getArticleInfo,
		resetArticleInfo,
		reloadArticleInfo,
	} = useArticleViewStore((state) => ({
		articleInfo: state.articleInfo,
		authorInfo: state.authorInfo,
		getArticleInfo: state.getArticleInfo,
		resetArticleInfo: state.resetArticleInfo,
		reloadArticleInfo: state.reloadArticleInfo,
	}));
	useEffect(() => {
		if (isNaN(Number(id))) {
			// TODO: 403处理
			return;
		}
		getArticleInfo(Number(id));
		return () => {
			resetArticleInfo();
		};
	}, [id]);
	if (!articleInfo || !authorInfo) return <></>;
	return (
		<>
			<div className='bg-article-bg blur-sm opacity-10 fixed top-0 left-0 w-screen h-screen bg-no-repeat bg-cover z-bg' />
			<MiddleViewVertical>
				<div className='w-[79%] h-full overflow-x-hidden flex flex-col gap-[10px] items-center'>
					<ArticleBlock articleInfo={articleInfo} />
					<CommentsBlock />
				</div>
				<div className='w-[20%] h-full border-solid flex flex-col gap-[10px] items-center sticky top-[5rem]'>
					<AuthorBlock
						authorInfo={authorInfo}
						articleId={articleInfo.articleId}
						refresh={reloadArticleInfo}
					/>
					<ArticleInteractionBlock articleInfo={articleInfo} />
					<CatalogBlock content={articleInfo.content} />
				</div>
			</MiddleViewVertical>
		</>
	);
});

/**
 * 文章区块
 */
function ArticleBlock({ articleInfo }: { articleInfo: ArticleDTO }) {
	return (
		<>
			{articleInfo.cover != "" ? (
				<img
					src={articleInfo.cover}
					alt='封面'
					className='bg-base-100 w-full'
				/>
			) : null}
			<article className='markdown-body w-full px-10 py-3'>
				<h1 className='pt-4 text-4xl font-black text-black'>
					{articleInfo.title}
				</h1>
				<span className='text-gray-400 flex gap-4'>
					<p>{articleInfo.authorName}</p>
					<p>
						{dayjs(articleInfo.lastUpdateTime).format("YYYY-MM-DD")}
					</p>
					<p>{articleInfo.count.readCount + " 阅读"}</p>
				</span>
				<MarkdownViewer content={articleInfo.content || ""} />
			</article>
		</>
	);
}

/**
 * 作者区块
 */
function AuthorBlock({
	authorInfo,
	articleId,
	refresh,
}: {
	authorInfo: UserStatisticInfoDTO;
	articleId: number;
	refresh: () => Promise<boolean>;
}) {
	return (
		<div className='w-full bg-base-100 flex flex-col md:flex-row gap-[10px] items-center justify-center py-3'>
			<div className='flex flex-col items-center px-4'>
				<UserAvatar
					src={authorInfo.photo}
					size='large'
					clickId={authorInfo.id}
				/>
				<div className=' font-bold'>{authorInfo.userName}</div>
			</div>
			<RelationalFunc
				followed={authorInfo.followed}
				userId={authorInfo.id}
				refresh={refresh}
			>
				<ArticleManageBlock articleId={articleId} />
			</RelationalFunc>
		</div>
	);
}

/**
 * 个人文章管理
 */
function ArticleManageBlock({ articleId }: { articleId: number }) {
	const authTo = useAuthTo();
	return (
		<div className='dropdown dropdown-end'>
			<label tabIndex={0} className='btn btn-sm'>
				文章管理
			</label>
			<ul
				tabIndex={0}
				className='dropdown-content menu p-2 mt-2 shadow bg-base-100 rounded-box w-24 gap-1'
			>
				<li>
					<a
						className='h-8'
						onClick={() => {
							authTo(`/edit-article/${articleId}`);
						}}
					>
						编辑
					</a>
				</li>
				<li>
					<a className='h-8 bg-warning text-white' onClick={() => {}}>
						删除
					</a>
				</li>
			</ul>
		</div>
	);
}

/**
 * 目录区块
 */
function CatalogBlock({ content }: { content: string }) {
	return (
		<div className='w-full bg-base-100 flex flex-col gap-[1px] items-center py-3 px-3'>
			<h1 className='w-full font-black text-xl'>目录</h1>
			<p className='divider m-0' />
			<Toc value={content} />
		</div>
	);
}
