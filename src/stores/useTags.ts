import { create } from "zustand";
import { getTags } from "@/apis/cacheData";
import { Await, ArticleTag } from "@/models";

type TagList = ArticleTag["result"];
type UseTagsType = {
	/** 文章标签列表 */
	tags: TagList;
	/** 获取文章标签 */
	getTags: () => Promise<void>;
};

/**
 * 文章标签获取
 */
const useTags = create<UseTagsType>((set) => ({
	tags: [],
	getTags: async () => {
		const { result: tags } = await getTags();
		set({
			tags,
		});
	},
}));

export default useTags;
