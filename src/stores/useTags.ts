import { create } from "zustand";
import { getTags } from "@/apis/cacheData";
import { ArticleTag } from "@/models";

type UseTagsStore = {
	/** 文章标签列表 */
	tags: ArticleTag;
	/** 是否还有更多 */
	hasMore: boolean;
	/** 当前页数 */
	page: number;
	/** 获取文章标签 */
	getTags: () => Promise<void>;
};

/**
 * 文章标签获取
 */
const useTagsStore = create<UseTagsStore>((set, get) => ({
	tags: [],
	page: 1,
	hasMore: true,
	getTags: async () => {
		const page = get().page;
		// 溢出上限
		if (page > 100 || !get().hasMore) return;
		const tag = await getTags(page);
		set((state) => ({
			tags: state.tags.concat(tag.list),
			hasMore: tag.hasMore,
			page: page + 1,
		}));
		get().getTags();
	},
}));

export default useTagsStore;
