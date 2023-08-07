import React, { useState, useEffect, memo } from "react";
import { useParams } from "react-router-dom";
import MiddleView from "../../layouts/MiddleView";
import { getArticle } from "../../apis/articles";
import "github-markdown-css";
import { Await } from "@/models";
import { MarkdownViewer } from "@/components/Markdown";
import UserInfo from "@/components/UserInfo";
import { CommentsSection } from "./CommentsSection";
import useArticleView from "@/stores/useArticleView";
import { shallow } from "zustand/shallow";

export default memo(function Article() {
	const { id } = useParams();
	const { articleInfo, authorInfo, getArticleInfo, resetArticleInfo } =
		useArticleView(
			(state) => ({
				articleInfo: state.articleInfo,
				authorInfo: state.authorInfo,
				getArticleInfo: state.getArticleInfo,
				resetArticleInfo: state.resetArticleInfo,
			}),
			shallow
		);
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
			<MiddleView>
				<UserInfo info={authorInfo} />
				<img src={articleInfo.cover} alt='封面' />
				<div className='divider' />
				<article className='markdown-body px-10'>
					<MarkdownViewer content={articleInfo.content || ""} />
				</article>
				<CommentsSection />
			</MiddleView>
		</>
	);
});
