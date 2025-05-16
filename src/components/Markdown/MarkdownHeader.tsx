import React, { useState, memo, useEffect } from "react";
import {
	Link,
	useSearchParams,
	useNavigate,
	useParams,
} from "react-router-dom";
import ArticleInfo from "./ArticleInfo";
import useArticleEditStore from "@/stores/useArticleEditStore";
import useArticleEditInfo from "@/hooks/useArticleInfo";
import debounce from "@/utils/debounce";
import useLoginStore from "@/stores/useLoginStore";
import { HeaderUserInfo } from "../TheHeader/HeaderUserInfo";
// import "./TheHeader.css";

/**
 * 页头组件
 */
export default memo(function MarkdownHeader() {
	const [search, setSearch] = useSearchParams();
	const onSave = useArticleEditStore((state) => state.onSave);
	const navigate = useNavigate();
	/** 生成摘要方法 */
	const generateArticleSummart = useArticleEditStore(
		(state) => state.generateArticleSummart
	);
	const { articleInfo } = useArticleEditInfo();
	// 打开提交文章事件
	const clickPublish = () => {
		if (articleInfo != "await" && !articleInfo.summary)
			generateArticleSummart();
	};
	const userInfo = useLoginStore((state) => state.userInfo);
	const logout = useLoginStore((state) => state.logout);
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
							className='h-9 px-4 rounded-md btn-primary text-white font-bold text-base shadow-none border-none hover:bg-[#6a3ce3] transition'
							onClick={clickPublish}
							// TODO: 失焦处理
							// onBlur={(e) => {
							// 	console.log("sjsjsj");
							// 	e.target.focus();
							// }}
							// onClick={openSubmitArticleBox}
						>
							发布
						</button>{" "}
					</label>
					<SubmitArticleBox />
				</div>

				{/* 用户 */}
				<HeaderUserInfo />
			</div>
		</header>
	);
});

/** 文章标题编辑框 */
function ArticleTitle() {
	// 获取、绑定文章标题信息
	const { articleInfo, saveArticleInfoBus } = useArticleEditInfo();
	const curTitle = articleInfo != "await" ? articleInfo.title : undefined;
	const [title, setTitle] = useState<string>(curTitle || "");
	useEffect(() => {
		if (curTitle == title || articleInfo == "await") return;
		setTitle(curTitle || "");
	}, [curTitle]);
	// 防抖保存文章标题
	useEffect(() => {
		debounce(() => {
			saveArticleInfoBus({ title });
		}, 500);
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
	const { type } = useParams();
	const { saveArticleInfoBus, articleInfo, postArticle } =
		useArticleEditInfo();
	// 验证文章信息是否完整
	const isArticleInfoUseable =
		articleInfo != "await" &&
		articleInfo.content != "" &&
		articleInfo.title != "" &&
		articleInfo.categoryId &&
		articleInfo.tagIds &&
		articleInfo.summary &&
		articleInfo.summary.length > 0;
	const [isPublishing, setIsPublishing] = useState(false);
	// 发布文章方法
	const publishArticle = async () => {
		// await saveArticleInfoBus({ actionType: "POST" });
		setIsPublishing(true);
		let articleId = -1;
		try {
			articleId = await postArticle({ status: 1 });
		} catch (e) {
			console.log(e);
			setIsPublishing(false);
		}
		if (articleId === -1) navigate("/");
		else navigate(`/article/${articleId}`);
		setIsPublishing(false);
	};
	return (
		<div
			tabIndex={2}
			className='card mt-3 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-[40rem]'
		>
			<div className='card-body'>
				<h2 className='card-title'>
					{Number(type) === 0 ? "发布文章" : "修改文章"}
				</h2>
				<div className='divider' />

				<ArticleInfo />

				<div className='card-actions justify-end'>
					{/* <button className='btn btn-primary btn-outline btn-sm'>
						取消
					</button> */}
					<button
						className={
							"btn btn-primary btn-sm" +
							(isArticleInfoUseable && !isPublishing
								? ""
								: " btn-disabled")
						}
						onClick={publishArticle}
					>
						{Number(type) === 0 ? "确认并发布" : "确认修改"}
					</button>
				</div>
			</div>
		</div>
	);
}
