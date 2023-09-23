import React, { useState, useEffect, memo } from "react";
import { useParams } from "react-router-dom";
import MiddleViewVertical from "../../layouts/MiddleViewVertical";
import "github-markdown-css";
import { MarkdownViewer } from "@/components/Markdown";
import UserInfo, { RelationalFunc } from "@/components/UserInfo";
import { CommentsSection } from "./CommentsSection";
import useArticleViewStore from "@/stores/useArticleViewStore";
import UserAvatar from "@/components/UserAvatar";

export default memo(function Article() {
	const { id } = useParams();
	const { articleInfo, authorInfo, getArticleInfo, resetArticleInfo } =
		useArticleViewStore((state) => ({
			articleInfo: state.articleInfo,
			authorInfo: state.authorInfo,
			getArticleInfo: state.getArticleInfo,
			resetArticleInfo: state.resetArticleInfo,
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
				<div className='w-[1000px] h-full flex flex-col gap-[10px] items-center'>
					{articleInfo.cover != "" ? (
						<img
							src={articleInfo.cover}
							alt='封面'
							className='bg-base-100 w-full'
						/>
					) : null}
					<article className='markdown-body px-10 py-3'>
						<h1 className=' text-4xl font-black text-black'>
							{articleInfo.title}
						</h1>
						<MarkdownViewer content={articleInfo.content || ""} />
					</article>
					<CommentsSection />
				</div>
				{/* <UserInfo info={authorInfo} /> */}
				<div className='w-[190px] h-full border-solid flex flex-col gap-[10px] items-center'>
					<div className='w-full bg-base-100 flex flex-col gap-[10px] items-center py-3'>
						<UserAvatar src={authorInfo.photo} size='large' />
						<div>{authorInfo.userName}</div>
						<RelationalFunc
							self={false}
							followed={false}
							userId={0}
						/>
					</div>
				</div>
			</MiddleViewVertical>
		</>
	);
});
