import { generateSummary, getArticle, postArticle } from "@/apis/articles";
import type { Await } from "@/models";
import ArticlePostReq from "@/models/article/ArticlePostReq.model";
import { create } from "zustand";

type ArticleVO = Await<ReturnType<typeof getArticle>>;

/** 保存文章信息汇总缓存 */
let articleInfoCache: ArticlePostReq = {};
/** 保存文章信息汇总节流指示器 */
let onSaveArticleInfo: boolean = false;

type UseArticle = {
	/** 请求中状态 */
	onSave: boolean;
	/** 文章详情信息 */
	articleInfo: Partial<ArticleVO["article"]> & { content: string };
	/** 自动生成的文章简介 */
	articleSummaryAutoGenerate: string;
	/** 自动生成文章简介 */
	generateArticleSummart: Function;
	/** 获取文章信息 */
	getArticleInfo: (articleId: number) => Promise<void>;
	/** 初始化文章信息 */
	cleanArticleInfo: () => void;
	/** 保存文章信息(直接保存) */
	saveArticleInfoDirect: (articleInfo: ArticlePostReq) => Promise<void>;
	/**
	 * 保存文章信息(节流)
	 * @description 用于处理用户有高频可能的操作
	 */
	saveArticleInfo: (articleInfo: ArticlePostReq) => Promise<void>;
	/** 保存文章信息(汇总节流) */
	saveArticleInfoBus: (articleInfo: ArticlePostReq) => Promise<void>;
};

/** 文章详情数据 */
const useArticle = create<UseArticle>((set, get) => ({
	onSave: false,
	articleInfo: {
		content: "",
	},
	articleSummaryAutoGenerate: "",
	generateArticleSummart: async () => {
		if (get().articleInfo.content === "") return;
		const { result: summary } = await generateSummary(
			get().articleInfo.content
		);
		set(() => ({ articleSummaryAutoGenerate: summary }));
	},
	getArticleInfo: async (articleId) => {
		// 新建文章，初始化
		if (articleId === 0 || articleId === -1) {
			get().cleanArticleInfo();
			return;
		}
		// 获取文章信息
		const { article: articleInfo } = await getArticle(articleId);
		set(() => ({ articleInfo }));
		return;
	},
	cleanArticleInfo: () => {
		set(() => ({
			articleInfo: {
				content: "",
			},
			comments: [],
			author: undefined,
		}));
		articleInfoCache = {};
		onSaveArticleInfo = false;
	},
	saveArticleInfoDirect: async (articleInfo) => {
		set(() => ({
			onSave: true,
		}));
		// 新文章初始化
		if (!get().articleInfo.articleId) {
			const { result: articleId } = await postArticle(articleInfo);
			set((state) => ({
				articleInfo: {
					...state.articleInfo,
					...articleInfo,
					articleId,
				},
				onSave: false,
			}));
		}
		// 已存在文章保存
		else {
			const { result: articleId } = await postArticle({
				articleId: get().articleInfo.articleId,
				...articleInfo,
			});
			set((state) => ({
				articleInfo: {
					...state.articleInfo,
					...articleInfo,
					articleId,
				},
				onSave: false,
			}));
		}
	},
	saveArticleInfo: async (articleInfo) => {
		// 节流
		if (get().onSave) return;
		// 保存文章
		get().saveArticleInfoDirect(articleInfo);
	},
	saveArticleInfoBus: async (articleInfo) => {
		// 进行节流缓存
		if (onSaveArticleInfo) {
			articleInfoCache = { ...articleInfoCache, ...articleInfo };
		}
		// 进行保存操作
		else {
			onSaveArticleInfo = true;
			let cache: ArticlePostReq = { ...articleInfoCache, ...articleInfo };
			articleInfoCache = {};
			await get().saveArticleInfoDirect(cache);
			onSaveArticleInfo = false;
		}
	},
}));

export default useArticle;
