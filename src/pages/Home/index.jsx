import React, { Suspense, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import useArticleCache from "./useArticlesCache";
import Articles from "./Articles";
import Loading from "../../components/Loading";

/**
 * 首页文章列表
 *
 * @type {React.FC<null>}
 * @returns {React.ReactElement} theList
 */
const ArticleList = () => {
	const [search, setSearch] = useSearchParams();
	const category = search.get("category");
	const [articles, setArticles] = useArticleCache(category);
	useEffect(() => {
		if (!category) setSearch("category=全部");
		return () => {};
	}, [category]);
	return (
		<>
			{/* 背景 */}
			<div
				className={`${
					categoryBg[category] || categoryBg["全部"]
				} bg-cover bg-no-repeat bg-fixed fixed top-0 left-0 origin-left scale-x-20 md:scale-x-40 2xl:scale-x-95 z-bg min-w-bg md:min-w-screen min-h-screen `}
			/>
			<Suspense fallback={<Loading />}>
				<Articles homeData={articles} />
			</Suspense>
		</>
	);
};

//  不同页面的背景
const categoryBg = {
	全部: "bg-all-bg",
	前端: "bg-frontEnd-bg",
	后端: "bg-backEnd-bg",
	人工智能: "bg-AI-bg",
	大数据: "bg-bigData-bg",
	安卓: "bg-android-bg",
	开发工具: "bg-tool-bg",
	代码人生: "bg-life-bg",
	阅读: "bg-read-bg",
};

export default ArticleList;
