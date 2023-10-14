import {
	DcoType,
	generateSummary,
	getArticle,
	getArticleEdit,
	postArticle,
	postArticleInit,
	saveArticle,
} from "@/apis/articles";
import type { Await } from "@/models";
import ArticlePostReq from "@/models/article/ArticlePostReq.model";
import DraftDTO from "@/models/article/DraftDTO.model";
import { shallow } from "zustand/shallow";
import { createWithEqualityFn } from "zustand/traditional";

type ArticleVO = Await<ReturnType<typeof getArticle>>;

/** 保存文章信息汇总缓存 */
let articleInfoCache: ArticlePostReq = {};
/** 保存文章信息汇总节流指示器 */
let onSaveArticleInfo: boolean = false;

type UseArticleEditStore = {
	/** 请求中状态 */
	onSave: boolean;
	/** 文章详情信息 */
	articleInfo: (Partial<DraftDTO> & { content: string }) | "await";
	/** 自动生成的文章简介 */
	articleSummaryAutoGenerate: string;
	/** 自动生成文章简介 */
	generateArticleSummart: Function;
	/** 获取文章信息 */
	getArticleInfo: (articleId: number, doctype?: DcoType) => Promise<void>;
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
	/** 发布文章 */
	postArticle: (articleInfo: ArticlePostReq) => Promise<void>;
};

/** 文章详情数据(编辑) */
const useArticleEditStore = createWithEqualityFn<
	UseArticleEditStore,
	[never, unknown][]
>(
	(set, get) => ({
		onSave: false,
		articleInfo: {
			content: "",
		},
		articleSummaryAutoGenerate: "",
		generateArticleSummart: async () => {
			const articleInfo = get().articleInfo;
			if (articleInfo === "await" || articleInfo.content === "") return;
			const summary = await generateSummary(articleInfo.content);
			set(() => ({ articleSummaryAutoGenerate: summary }));
		},
		getArticleInfo: async (articleId, doctype = 0) => {
			// 新建文章，初始化
			if (articleId === 0 || articleId === -1) {
				get().cleanArticleInfo();
				console.log("初始化草稿");
				const articleId = await postArticleInit({});
				set((state) => {
					return {
						articleInfo: {
							// ...articleInfo,
							content: "",
							articleId,
						},
						onSave: false,
					};
				});
				return;
			}
			// 获取文章信息
			const articleInfo = await getArticleEdit(articleId, doctype);
			set(() => ({ articleInfo }));
			return;
		},
		cleanArticleInfo: () => {
			set(() => ({
				articleInfo: "await",
				comments: [],
				author: undefined,
			}));
			articleInfoCache = {};
			onSaveArticleInfo = false;
		},
		saveArticleInfoDirect: async (newArticleInfo) => {
			let articleInfo = get().articleInfo;
			if (
				articleInfo === "await" ||
				(!articleInfo.articleId && !articleInfo.id)
			)
				return;
			set(() => ({
				onSave: true,
			}));
			console.log("自动保存", articleInfo);
			await saveArticle({
				draftId: articleInfo.id,
				...newArticleInfo,
			});
			set((state) => {
				let articleInfo = state.articleInfo;
				articleInfo =
					articleInfo === "await" ? { content: "" } : articleInfo;
				return {
					articleInfo: {
						...articleInfo,
						...newArticleInfo,
					},
					onSave: false,
				};
			});
			// }
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
				let cache: ArticlePostReq = {
					...articleInfoCache,
					...articleInfo,
				};
				articleInfoCache = {};
				await get().saveArticleInfoDirect(cache);
				onSaveArticleInfo = false;
			}
		},
		postArticle: async (newArticleInfo) => {
			const articleInfo = get().articleInfo;
			if (articleInfo === "await") return;
			await postArticle({
				...articleInfo,
				...newArticleInfo,
				articleId: articleInfo.articleId,
			});
		},
	}),
	shallow
);

export default useArticleEditStore;
