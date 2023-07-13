import { create } from "zustand";
import { getCategorys } from "@/apis/cacheData";
import { Await, ArticleCategory } from "@/models";

type CategoryList = ArticleCategory["result"];
type UseCategorysType = {
	/** 文章分类列表 */
	categorys: CategoryList;
	/** 获取文章分类 */
	getCategorys: () => Promise<void>;
};

/**
 * 文章分类获取
 */
const useCategorys = create<UseCategorysType>((set) => ({
	categorys: [],
	getCategorys: async () => {
		const { result: categorys } = await getCategorys();
		set({
			categorys,
		});
	},
}));

export default useCategorys;
