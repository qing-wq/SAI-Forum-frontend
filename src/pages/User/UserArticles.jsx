import React from "react";

export default function UserArticles({ articles }) {
	return (
		<div className="card w-full min-h-screen bg-base-100 shadow-xl hover:shadow-2xl transition-all ">
			<div className="flex px-4 h-10 leading-10 rounded-t-xl border-solid border-b-2 border-opacity-50 border-b-primary">
				<div className="text-center w-24 font-black hover:text-primary border-b-2">
					动态
				</div>
				<div className="text-center w-24 font-black">文章</div>
				<div className="text-center w-24 font-black">专栏</div>
				<div className="text-center w-24 font-black">收藏</div>
			</div>
			{articles.map((article) => (
				<Article key={article.articleId} article={article} />
			))}
		</div>
	);
}

function Article({ article }) {
	return (
		<div className="w-full h-32 p-4  border-solid border-b-[1px] border-opacity-10 border-b-black bg-base-100 group cursor-pointer last:rounded-b-xl">
			<div className="flex">
				{/* text */}
				<div className="flex-1">
					<h1 className="line-clamp-1 text-2xl group-hover:text-primary-focus mb-3">
						{article.title}
					</h1>
					<p className="line-clamp-2 text-gray-700">
						{article.summary}
					</p>
				</div>
				{/* cover */}
				<div className={`pl-5 ${article.cover ? "" : "hidden"}`}>
					<img
						className=" inline-block max-h-24 rounded-md"
						src="https://th.bing.com/th/id/OIP.HmkpEMapxGo07fZc_fr8ZwHaE7?w=281&h=187&c=7&r=0&o=5&pid=1.7"
						alt="cover"
					/>
				</div>
			</div>
		</div>
	);
}
