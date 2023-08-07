import { create } from "zustand";
import { getCategorys } from "@/apis/cacheData";
import { Await, ArticleCategory } from "@/models";

type CategoryList = ArticleCategory["result"];
type UseCategorysType = {
	/** 文章分类列表 */
	categorys: CategoryList;
	/** 获取文章分类 */
	getCategorys: () => Promise<void>;
	/** 根据文章名获取Id */
	getCategoryId: (categoryName:string)=>number
};

/**
 * 文章分类获取
 */
const useCategorys = create<UseCategorysType>((set, get) => ({
	categorys: [],
	getCategorys: async () => {
		const { result: categorys } = await getCategorys();
		set({
			categorys,
		});
	},
	getCategoryId: (categoryName: string)=>{
		get().categorys.forEach((category)=>{
			if(category.category === categoryName)return category.categoryId;
		})
		return 0;
	}
}));

export default useCategorys;
