import React, { MouseEventHandler, useEffect, useState } from "react";
import { UserInfo } from "@/models/index";
import { useNavigate, Link } from "react-router-dom";
import { HomeSelectType } from "@/apis/user";
import { articleInteraction, deleteArticle } from "@/apis/articles";
import LoadPerPage from "@/components/LoadPerPage";
import ArticleDTO from "@/models/article/ArticleDTO.model";
import PageListVo from "@/models/page/PageListVo.model";

type UserArticlesProp = {
	articles: UserInfo["homeSelectList"];
	tab: HomeSelectType;
	loadFunc: (page: number) => Promise<PageListVo<ArticleDTO>>;
};

/** 用户文章列表页 */
export default function UserArticles({
	articles,
	tab,
	loadFunc,
}: UserArticlesProp) {
	const navigate = useNavigate();
	const [ended, setEnded] = useState<boolean>(!articles.hasMore);
	const [articlesList, setArticlesList] = useState<ArticleDTO[]>(
		articles.list
	);
	const [curPage, setCurPage] = useState<number>(1);
	// 添加收藏状态
	const [collectionStates, setCollectionStates] = useState<{[key: number]: boolean}>({});

	useEffect(() => {
		setArticlesList(articles.list);
		setEnded(!articles.hasMore);
		setCurPage(1);
		// 初始化所有文章的收藏状态为true（如果是收藏页面）
		if (tab === 'collection') {
			const initialStates: {[key: number]: boolean} = {};
			articles.list.forEach(article => {
				initialStates[article.articleId] = true;
			});
			setCollectionStates(initialStates);
		}
	}, [articles, tab]);

	const openArticle = (id: number) => {
		navigate("/article/" + id);
	};

	// 处理收藏/取消收藏操作
	const handleCollection = async (articleId: number, e: React.MouseEvent) => {
		e.stopPropagation(); // 阻止事件冒泡
		const isCurrentlyCollected = collectionStates[articleId] || false;
		try {
			await articleInteraction(
				articleId,
				isCurrentlyCollected ? 5 : 3 // 5表示取消收藏，3表示收藏
			);
			setCollectionStates(prev => ({
				...prev,
				[articleId]: !isCurrentlyCollected
			}));
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<div className=''>
			{articlesList.length > 0 ? (
				<>
					{articlesList.map((article) => (
						<Article
							key={article.articleId}
							article={article}
							tab={tab}
							collectionStates={collectionStates}
							handleCollection={handleCollection}
							onClick={() => {
								openArticle(article.articleId);
							}}
						>
							{tab === 'collection' && (
								<div
									className={`btn btn-sm text-white ${collectionStates[article.articleId] ? "btn-warning" : "btn-primary"}`}
									onClick={(e) => handleCollection(article.articleId, e)}
								>
									{collectionStates[article.articleId] ? "取消收藏" : "收藏文章"}
								</div>
							)}
						</Article>
					))}
					<LoadPerPage
						ended={ended}
						successShow={<></>} /* 有内容且加载完成时不显示任何提示 */
						loadFunc={async () => {
							const res = await loadFunc(curPage + 1);
							setArticlesList(articlesList.concat(res.list));
							setEnded(!res.hasMore);
						}}
					>
						加载中...
					</LoadPerPage>
				</>
			) : (
				<div className='w-full flex flex-col items-center justify-center py-16 px-4'>
					<div className="bg-purple-50 rounded-full p-6 mb-4">
						<svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
						</svg>
					</div>
					<h3 className="text-lg font-medium text-gray-700 mb-2">此处没有内容</h3>
					<p className="text-gray-500 text-sm text-center max-w-md">暂时没有相关内容，可以去其他地方查看</p>
				</div>
			)}
		</div>
	);
}

type ArticleProp = {
	article: UserArticlesProp["articles"]["list"][number];
	tab: HomeSelectType;
	onClick?: MouseEventHandler<HTMLDivElement>;
	children?: React.ReactNode;
	collectionStates?: {[key: number]: boolean};
	handleCollection?: (articleId: number, e: React.MouseEvent) => void;
};

function Article({ article, tab, onClick, children, collectionStates, handleCollection }: ArticleProp) {
	// 格式化时间显示
	const formatDate = (timestamp: number) => {
		const date = new Date(timestamp);
		const now = new Date();
		const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
		
		if (diffDays === 0) {
			// 今天
			return `今天 ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
		} else if (diffDays === 1) {
			// 昨天
			return `昨天 ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
		} else if (diffDays < 7) {
			// 一周内
			return `${diffDays}天前`;
		} else {
			// 超过一周
			return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
		}
	};

	// 判断是否是历史记录或收藏页面
	const isArticleTab = tab === "article";

	return (
		<div
			className='w-full flex items-center p-4 group hover:bg-[#f7f5fe] border-0 border-b border-gray-100 hover:shadow-sm transition-all duration-200 cursor-pointer rounded-md'
			onClick={onClick}
		>
			<div className='flex flex-col h-full'>
				<div className='flex mb-2'>
					{/* text */}
					<div className='flex-1'>
						<div className='flex justify-between items-start'>
							<h1 className='line-clamp-1 text-xl font-medium group-hover:text-primary-focus mb-2 cursor-pointer flex-1'>
								{article.title}
							</h1>
						</div>
						<p className='line-clamp-2 text-gray-600 text-sm mb-2'>
							{article.summary}
						</p>
					</div>
					{/* cover */}
					<div className={`pl-5 ${article.picture ? "" : "hidden"}`}>
						<img
							className='inline-block max-h-24 w-40 rounded-md object-cover'
							src={article.picture}
							alt='文章封面'
						/>
					</div>
				</div>
				
				{/* 文章信息和交互 */}
				<div className='flex items-center justify-between mt-auto'>
					{/* 左侧：时间和数据统计 - 只在文章页面显示 */}
					{isArticleTab && (
						<div className='flex items-center text-xs text-gray-500 space-x-4'>
							{/* 发布时间 */}
							<span className='flex items-center'>
								<svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
								</svg>
								{formatDate(Number(article.createTime))}
							</span>
							
							{/* 阅读量 */}
							<span className='flex items-center'>
								<svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
								</svg>
								{article.count?.readCount || 0}
							</span>
							
							{/* 点赞数 */}
							<span className='flex items-center'>
								<svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
								</svg>
								{article.count?.praiseCount || 0}
							</span>
							
							{/* 评论数 */}
							<span className='flex items-center'>
								<svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
								</svg>
								{article.count?.commentCount || 0}
							</span>

							<div className='dropdown dropdown-end ml-4'>
								{/* 下拉菜单触发按钮 */}
								<button
									className="inline-flex justify-center rounded-md p-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none"
									onClick={(e) => e.stopPropagation()}
									tabIndex={0}
								>
									<svg className="h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
									</svg>
								</button>

								{/* 下拉菜单内容 */}
								<ul
									tabIndex={0}
									className='mt-3 p-0 shadow-lg menu menu-compact dropdown-content bg-base-100 rounded-lg w-40 overflow-hidden'
								>
									{/* 编辑选项 */}
									<li className="hover:bg-purple-50 transition-colors group" onClick={() => document.activeElement instanceof HTMLElement && document.activeElement.blur()}>
										<Link 
											to={`/edit-article/${article.articleId}/1`} 
											className="py-2.5 px-4 text-gray-700 hover:text-purple-700 transition-colors flex items-center"
											onClick={(e) => e.stopPropagation()}
										>
											<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 group-hover:text-purple-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
											</svg>
											<span>编辑</span>
										</Link>
									</li>
									{/* 删除选项 */}
									<li className="hover:bg-purple-50 transition-colors group" onClick={() => document.activeElement instanceof HTMLElement && document.activeElement.blur()}>
										<button
											className="py-2.5 px-4 text-gray-700 hover:text-red-600 transition-colors flex items-center w-full text-left"
											onClick={(e) => {
												e.stopPropagation();
												if (window.confirm('确定要删除这篇文章吗？')) {
													// 调用删除文章API
													deleteArticle(article.articleId)
														.then(() => {
															// 删除成功后刷新页面
															window.location.reload();
														})
														.catch(err => {
															console.error('删除文章失败', err);
															alert('删除文章失败，请重试');
														});
												}
											}}
										>
											<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 group-hover:text-red-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
											</svg>
											<span>删除</span>
										</button>
									</li>
								</ul>
							</div>
						</div>
					)}
					
					{/* 最右侧：文章标签 - 只在文章页面显示 */}
					{isArticleTab && article.tags && article.tags.length > 0 && (
						<div className='flex items-center ml-auto'>
							<span 
								key={article.tags[0].tagId} 
								className='px-2 py-0.5 bg-purple-50 text-purple-600 text-xs rounded-full'
							>
								{article.tags[0].tag}
							</span>
						</div>
					)}
				</div>
			</div>

			{tab === 'collection' && collectionStates && handleCollection && (
				<div 
					className={`btn btn-sm text-white ml-2 ${collectionStates[article.articleId] ? "btn-warning" : "btn-primary"}`}
					onClick={(e) => handleCollection(article.articleId, e)}
				>
					{collectionStates[article.articleId] ? "取消收藏" : "收藏文章"}
				</div>
			)}
		</div>
	);
}

// 将ArticleInteraction组件集成到Article组件中，不再单独定义
