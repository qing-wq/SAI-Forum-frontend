import { getArticle } from "@/apis/articles";
import ArticleDTO from "@/models/article/ArticleDTO.model";
import ArticleDetailVo from "@/models/article/ArticleDetailVo.model";
import TopCommentDTO from "@/models/comment/TopCommentDTO.model";
import UserStatisticInfoDTO from "@/models/user/UserStatisticInfoDTO.model";
import { shallow } from "zustand/shallow";

import { createWithEqualityFn } from "zustand/traditional";

type UseArticleViewStore = {
	/** 文章信息 */
	articleInfo?: ArticleDTO;
	/** 作者信息 */
	authorInfo?: UserStatisticInfoDTO;
	/** 评论列表 */
	comments?: TopCommentDTO[];
	/** 文章id */
	articleId?: number;
	/** 文章状态 */
	status: "loading" | "success" | "error";
	/** 获取文章信息 */
	getArticleInfo: (articleId: number) => Promise<void>;
	/** 重置文章信息 */
	resetArticleInfo: () => void;
	/** Viewer root */
	viewer: HTMLElement | null;
	/** 设置viewer */
	setViewer: (viewer: HTMLElement | null) => void;
	/** 重载文章信息 */
	reloadArticleInfo: () => Promise<boolean>;
};

/**
 * 文章详情数据(阅读)
 */
const useArticleViewStore = createWithEqualityFn<
	UseArticleViewStore,
	[never, unknown][]
>(
	(set, get) => ({
		articleInfo: undefined,
		authorInfo: undefined,
		comments: undefined,
		articleId: undefined,
		viewer: null,
		status: "success",
		getArticleInfo: async (articleId: number) => {
			set({ status: "loading" });
			let res: ArticleDetailVo;
			try {
				res = await getArticle(articleId);
			} catch (e) {
				set({ status: "error" });
				return;
			}
			// TODO: 类型检查
			set(() => ({
				articleId: articleId,
				articleInfo: res.article,
				authorInfo: res.author,
				comments: res.comments,
				status: "success",
			}));
		},
		resetArticleInfo: () => {
			set(() => ({
				articleId: undefined,
				articleInfo: undefined,
				authorInfo: undefined,
				comments: undefined,
				viewer: null,
				status: "success",
			}));
		},
		setViewer(viewer) {
			set({
				viewer,
			});
		},
		reloadArticleInfo: async () => {
			try {
				await get().getArticleInfo(get().articleId!);
				return true;
			} catch (e) {
				console.error(e);
				return false;
			}
		},
	}),
	shallow
);

export default useArticleViewStore;
