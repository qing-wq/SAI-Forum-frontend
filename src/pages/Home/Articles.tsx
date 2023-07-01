import React, { memo } from "react";
import { useNavigate } from "react-router-dom";
import MiddleView from "../../layouts/MiddleView";
import MoreLoading from "../../components/MoreLoading";

import SVG from "../../svg";
import { HomeData } from "@/models";

type ArticlesProp = {
	homeData: {
		read: () => HomeData["result"];
	};
};

export default memo(function Articles({ homeData }: ArticlesProp) {
	const data = homeData.read();
	const { list: articles, hasMore } = data.articles;
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
		<MiddleView>
			{articles.map((article) => (
				<div
					key={article.articleId}
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
						<div
							className={`pl-5 ${article.cover ? "" : "hidden"}`}
						>
							<img
								className=' inline-block max-h-24 rounded-md'
								src='https://th.bing.com/th/id/OIP.HmkpEMapxGo07fZc_fr8ZwHaE7?w=281&h=187&c=7&r=0&o=5&pid=1.7'
								alt='cover'
							/>
						</div>
					</div>
					{/* message */}
					<div className='flex gap-1 h-10 items-center justify-between whitespace-nowrap'>
						{/* left */}
						<div
							className='flex gap-3 items-center max-h-md hover:text-primary-focus'
							onClick={(e) => {
								clickAuthor(article.author, e);
							}}
						>
							{/* author */}
							<div className='avatar'>
								<div className=' w-6 h-6 inline-block rounded-full'>
									<img src='https://cdn.tobebetterjavaer.com/paicoding/avatar/0082.png' />
								</div>
							</div>
							<p>{article.authorName}</p>
							{/* time */}
							<p className=' text-gray-500 hidden xl:inline'>
								{formatTime(article.createTime)}
							</p>
						</div>
						{/* counts */}
						<CountView count={article.count} />
						{/* right */}
						{/* tags */}
						<div className=' inline-flex gap-1 w-32 overflow-hidden'>
							{article.tags.map((tag) => (
								<span key={tag.tagId} className='badge'>
									{tag.tag}
								</span>
							))}
						</div>
					</div>
				</div>
			))}
			<div className=' w-full h-[30px] leading-7 bg-purple-200 bg-opacity-10'>
				{hasMore ? (
					<div className='w-full text-center leading-8'>
						没有更多了
					</div>
				) : (
					// <div className=" w-full text-center leading-8 px-10">
					// 	<progress className="progress progress-primary w-full" />
					// </div>
					<MoreLoading />
				)}
			</div>
		</MiddleView>
	);
});

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
	count: HomeData["result"]["articles"]["list"][number]["count"];
};
function CountView({ count }: CountViewProp) {
	return (
		<div className='absolute leading-10 left-20vw xl:left-30vw flex whitespace-nowrap gap-3 group-hover:text-primary-focus'>
			<span className='flex items-center'>
				<SVG name='handThumbUp' />
				<p>{count.praiseCount}</p>
			</span>
			<span className='flex items-center'>
				<SVG name='eye' />
				<p>{count.readCount}</p>
			</span>
			<span className='flex items-center'>
				<SVG name='star' />
				<p>{count.collectionCount}</p>
			</span>
			<span className='flex items-center'>
				<SVG name='chat' />
				<p>{count.commentCount}</p>
			</span>
		</div>
	);
}
