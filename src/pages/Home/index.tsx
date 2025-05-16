import React, { Suspense, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import useArticleCache from "./useArticlesCache";
import Articles from "./Articles";
import Loading from "../../components/Loading";
import { HomeData } from "@/models";
import MiddleViewVertical from "@/layouts/MiddleViewVertical";
import { Banner } from "./Banner";

const Home = () => {
	return (
		<MiddleViewVertical
			top={<BannerBlock />}
		>
			<div className="flex w-full gap-5">
				<ArticleList />
				<div className='w-[280px] mycard !sticky top-24 rounded-lg overflow-hidden border border-purple-50 h-fit max-h-[500px]'>
				{/* 推荐栏标题 */}
				<div className='bg-[#f7f5fe] text-[#7c3aed] font-bold py-3 px-4 text-lg border-b border-purple-100'>
					热门推荐
				</div>
				
				{/* 推荐内容 */}
				<div className='p-4 space-y-4'>
					
					{/* 热门话题 */}
					<div className='pt-2'>
						<div className='font-bold text-[#7c3aed] mb-2 flex items-center'>
							<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
							</svg>
							热门话题
						</div>
						<div className='space-y-2'>
							<div className='text-sm hover:text-[#ff1aff] cursor-pointer transition-colors duration-300'>#人工智能</div>
							<div className='text-sm hover:text-[#ff1aff] cursor-pointer transition-colors duration-300'>#Spring Boot</div>
							<div className='text-sm hover:text-[#ff1aff] cursor-pointer transition-colors duration-300'>#前端开发</div>
						</div>
					</div>
					
					{/* 热门作者 */}
					<div className='pt-2'>
						<div className='font-bold text-[#7c3aed] mb-2 flex items-center'>
							<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
							</svg>
							活跃作者
						</div>
						<div className='space-y-2'>
							<div className='text-sm hover:text-[#ff1aff] cursor-pointer transition-colors duration-300'>管理员</div>
							<div className='text-sm hover:text-[#ff1aff] cursor-pointer transition-colors duration-300'>LunaSeki</div>
						</div>
					</div>
				</div>
				</div>
			</div>
		</MiddleViewVertical>
	);
};

/**
 * 首页轮播图区块
 */
const BannerBlock = () => {
	const navigate = useNavigate();
	return (
		<Banner
			banners={[
				{
					img: "/images/20241118110221240_54.png",
					title: "SAI论坛开放测试",
					onClick: () => navigate("/article/251"),
				},
				{
					img: "/images/20241118110221240_54.png",
					title: "SAI论坛开放测试",
					onClick: () => navigate("/article/251"),
				},
			]}
		/>
	);
};

/**
 * 首页文章列表
 * @type {React.FC<null>}
 * @returns {React.ReactElement} theList
 */
const ArticleList = () => {
	const [search, setSearch] = useSearchParams();
	const category = search.get("category");
	const [articles, setArticles] = useArticleCache(category || "全部");
	useEffect(() => {
		if (!category) setSearch("category=全部");
		return () => {};
	}, [category]);
	return (
		<div className='mycard w-[79%] overflow-hidden'>
			{/* 背景 */}
			<div
				onScroll={(e) => console.log(e)}
				className={`${
					category
						? categoryBg[category] || categoryBg["全部"]
						: categoryBg["全部"]
				} bg-cover bg-no-repeat bg-fixed fixed top-0 left-0 origin-left scale-x-20 md:scale-x-40 2xl:scale-x-95 z-bg min-w-bg md:min-w-screen min-h-screen `}
			/>
			<Suspense fallback={<Loading />}>
				<div className='w-full'>
					<Articles
						homeData={articles as { read: () => HomeData }}
						category={category || "全部"}
					/>
				</div>
			</Suspense>
		</div>
	);
};

type CategoryBg = {
	[categoryName: string]: string;
};
//  不同页面的背景
const categoryBg: CategoryBg = {
	全部: "bg-all-bg",
	前端: "bg-frontEnd-bg",
	后端: "bg-backEnd-bg",
	人工智能: "bg-AI-bg",
	大数据: "bg-bigData-bg",
	Android: "bg-android-bg",
	开发工具: "bg-tool-bg",
	代码人生: "bg-life-bg",
	阅读: "bg-read-bg",
};

export default Home;
