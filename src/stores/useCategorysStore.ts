import { create } from "zustand";
import { getCategorys } from "@/apis/cacheData";
import { ArticleCategory } from "@/models";

type UseCategorysStore = {
	/** 文章分类列表 */
	categorys: ArticleCategory;
	/** 获取文章分类 */
	getCategorys: () => Promise<void>;
	/** 根据文章名获取Id */
	getCategoryId: (categoryName: string) => number;
};

/**
 * 文章分类获取
 */
const useCategorysStore = create<UseCategorysStore>((set, get) => ({
	categorys: [],
	getCategorys: async () => {
		const categorys = await getCategorys();
		set({
			categorys,
		});
	},
	getCategoryId: (categoryName: string) => {
		get().categorys.forEach((category) => {
			if (category.category === categoryName) return category.categoryId;
		});
		return 0;
	},
}));

export default useCategorysStore;
