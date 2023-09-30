import { getArticle } from "@/apis/articles";
import ArticleDTO from "@/models/article/ArticleDTO.model";
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
	/** 获取文章信息 */
	getArticleInfo: (articleId: number) => Promise<void>;
	/** 重置文章信息 */
	resetArticleInfo: () => void;
	/** Viewer root */
	viewer: HTMLElement | null;
	/** 设置viewer */
	setViewer: (viewer: HTMLElement | null) => void;
};

/**
 * 文章详情数据(阅读)
 */
const useArticleViewStore = createWithEqualityFn<
	UseArticleViewStore,
	[never, unknown][]
>(
	(set) => ({
		articleInfo: undefined,
		authorInfo: undefined,
		comments: undefined,
		articleId: undefined,
		viewer: null,
		getArticleInfo: async (articleId: number) => {
			const res = await getArticle(articleId);
			// TODO: 类型检查
			set(() => ({
				articleId: articleId,
				articleInfo: res.article,
				authorInfo: res.author,
				comments: res.comments,
			}));
		},
		resetArticleInfo: () => {
			set(() => ({
				articleId: undefined,
				articleInfo: undefined,
				authorInfo: undefined,
				comments: undefined,
				viewer: null,
			}));
		},
		setViewer(viewer) {
			set({
				viewer,
			});
		},
	}),
	shallow
);

export default useArticleViewStore;
