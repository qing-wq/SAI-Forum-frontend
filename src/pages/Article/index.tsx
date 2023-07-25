import React, { useState, useEffect, memo } from "react";
import { useParams } from "react-router-dom";
import MiddleView from "../../layouts/MiddleView";
import { getArticle } from "../../apis/articles";
import "github-markdown-css";
import { Await } from "@/models";
import { MarkdownViewer } from "@/components/Markdown";
import UserInfo from "@/components/UserInfo";

export default memo(function Article() {
	const { id } = useParams();
	const [detail, setDetail] =
		useState<Await<ReturnType<typeof getArticle>>>();
	useEffect(() => {
		if (isNaN(Number(id))) {
			// TODO: 403处理
			return;
		}
		getArticle(Number(id)).then((res) => {
			setDetail(res);
			console.log(res);
		});
		return () => {};
	}, [id]);
	if (!detail) return <></>;
	return (
		<>
			<div className='bg-article-bg blur-sm opacity-10 fixed top-0 left-0 w-screen h-screen bg-no-repeat bg-cover z-bg' />
			<MiddleView>
				<UserInfo info={detail?.author} /> <div className='divider' />
				<article className='markdown-body px-10'>
					<MarkdownViewer content={detail?.article.content || ""} />
				</article>
			</MiddleView>
		</>
	);
});
