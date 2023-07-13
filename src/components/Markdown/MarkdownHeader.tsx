import React, { useState, memo, useEffect } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import ArticleInfo from "./ArticleInfo";
import useArticle from "@/stores/useArticle";
import useArticleInfo from "@/hooks/useArticleInfo";
import debounce from "@/utils/debounce";
// import "./TheHeader.css";

/**
 * 页头组件
 */
export default memo(function MarkdownHeader() {
	const [search, setSearch] = useSearchParams();
	const onSave = useArticle((state) => state.onSave);
	const navigate = useNavigate();
	/** 生成摘要方法 */
	const generateArticleSummart = useArticle(
		(state) => state.generateArticleSummart
	);
	const { articleInfo } = useArticleInfo();
	// 打开提交文章事件
	const clickPublish = () => {
		if (!articleInfo.summary) generateArticleSummart();
	};
	return (
		<header className='navbar gap-2 2xl:gap-6 bg-base-100  shadow-md z-10'>
			{/* 文章信息 */}
			<div className=' flex-auto gap-2 2xl:gap-6'>
				<ArticleTitle />
				<p className='whitespace-nowrap text-gray-500'>
					{onSave ? "保存中..." : "已保存"}
				</p>
			</div>
			<div className='flex-none gap-2'>
				{/* 发布按钮 */}
				<div className='dropdown dropdown-end'>
					<label tabIndex={0}>
						<button
							className='btn btn-primary text-base font-black'
							onClick={clickPublish}
							// TODO: 失焦处理
							// onBlur={(e) => {
							// 	console.log("sjsjsj");
							// 	e.target.focus();
							// }}
							// onClick={openSubmitArticleBox}
						>
							发 布
						</button>{" "}
					</label>
					<SubmitArticleBox />
				</div>

				{/* 用户 */}
				<div className='dropdown dropdown-end'>
					<label
						tabIndex={1}
						className='btn btn-ghost btn-circle avatar'
					>
						<div className='w-10 rounded-full'>
							<img src='https://cdn.tobebetterjavaer.com/paicoding/avatar/0082.png' />
						</div>
					</label>
					<ul
						tabIndex={2}
						className='mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52'
					>
						{/* <li>
							<a className="justify-between">
								配置
								<span className="badge">New</span>
							</a>
						</li> */}
						<li>
							<Link to={"/user/self"}>主页</Link>
						</li>
						<li>
							<a>登出</a>
						</li>
					</ul>
				</div>
			</div>
		</header>
	);
});

/** 文章标题编辑框 */
function ArticleTitle() {
	// 获取、绑定文章标题信息
	const { articleInfo, saveArticleInfoBus } = useArticleInfo();
	const [title, setTitle] = useState<string>(articleInfo.title || "");
	useEffect(() => {
		if (articleInfo.title == title) return;
		setTitle(articleInfo.title || "");
	}, [articleInfo.title]);
	// 防抖保存文章标题
	useEffect(() => {
		debounce(() => {
			saveArticleInfoBus({ title });
		}, 2000);
	}, [title]);
	return (
		<div className='form-control w-full'>
			<input
				type='text'
				placeholder='请输入文章标题'
				className='input text-2xl'
				value={title}
				onChange={(e) => setTitle(e.currentTarget.value)}
			/>
		</div>
	);
}

/** 文章其他信息编辑框 */
function SubmitArticleBox() {
	const navigate = useNavigate();
	const { saveArticleInfoBus, articleInfo } = useArticleInfo();
	// 验证文章信息是否完整
	const isArticleInfoUseable =
		articleInfo.content != "" &&
		articleInfo.title != "" &&
		articleInfo.category &&
		articleInfo.tags &&
		articleInfo.cover &&
		articleInfo.summary &&
		articleInfo.summary.length >= 50;
	// 发布文章方法
	const publishArticle = async () => {
		await saveArticleInfoBus({ actionType: "POST" });
		navigate("/");
	};
	return (
		<div
			tabIndex={2}
			className='card mt-3 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-[40rem]'
		>
			<div className='card-body'>
				<h2 className='card-title'>发布文章</h2>
				<div className='divider' />

				<ArticleInfo />

				<div className='card-actions justify-end'>
					{/* <button className='btn btn-primary btn-outline btn-sm'>
						取消
					</button> */}
					<button
						className={
							"btn btn-primary btn-sm" +
							(isArticleInfoUseable ? "" : " btn-disabled")
						}
						onClick={publishArticle}
					>
						确认并发布
					</button>
				</div>
			</div>
		</div>
	);
}
