import React, { MouseEventHandler } from "react";
import { UserInfo } from "@/models/index";
import { useNavigate } from "react-router-dom";

type UserArticlesProp = {
	articles: UserInfo["homeSelectList"];
};

/** 用户文章列表页 */
export default function UserArticles({ articles }: UserArticlesProp) {
	const navigate = useNavigate();
	const openArticle = (id: number) => {
		navigate("/article/" + id);
	};
	return (
		<div className='card w-[79%] min-h-screen bg-base-100 shadow-xl hover:shadow-2xl transition-all '>
			<div className='tabs w-full'>
				<a className='tab tab-lg tab-lifted !px-8 tab-active'>文章</a>
				<a className='tab tab-lg tab-lifted !px-8'>收藏</a>
				<a className='tab tab-lg tab-lifted !px-8'>草稿</a>
			</div>
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
				/>
			))}
		</div>
	);
}

type ArticleProp = {
	article: UserArticlesProp["articles"]["list"][number];
	onClick?: MouseEventHandler<HTMLDivElement>;
};

function Article({ article, onClick }: ArticleProp) {
	return (
		<div
			onClick={onClick}
			className='w-full h-32 p-4  border-solid border-b-[1px] border-opacity-10 border-b-black bg-base-100 group cursor-pointer first:rounded-t-xl last:rounded-b-xl'
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
						alt='文章封面'
					/>
				</div>
			</div>
		</div>
	);
}
