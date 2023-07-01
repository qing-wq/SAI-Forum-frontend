import ArticleDTO from "@/models/article/ArticleDTO.model";
import CategoryDTO from "@/models/article/CategoryDTO.model";
import PageListVo from "@/models/page/PageListVo.model";
import BaseUserInfoDTO from "@/models/user/BaseUserInfoDTO.model";

/** 首页数据VO */
export default interface IndexVo {
	/** 分类列表 */
	categories: CategoryDTO[];
	/** 当前选择分类 */
	currentCategory: CategoryDTO["category"];
	/** 当前选择分类Id */
	categoryId: CategoryDTO["categoryId"];
	/** 文章列表 */
	articles: PageListVo<ArticleDTO>;
	/** 当前登录用户信息 */
	user: BaseUserInfoDTO;
}
