import { create } from "zustand";
import { getTags } from "@/apis/cacheData";
import { ArticleTag } from "@/models";

type UseTagsStore = {
	/** 文章标签列表 */
	tags: ArticleTag;
	/** 获取文章标签 */
	getTags: () => Promise<void>;
};

/**
 * 文章标签获取
 */
const useTagsStore = create<UseTagsStore>((set) => ({
	tags: [],
	getTags: async () => {
		const tags = await getTags();
		set({
			tags,
		});
	},
}));

export default useTagsStore;
