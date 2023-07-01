import ArticleDTO from "@/models/article/ArticleDTO.model";

type Sort = number;

/** 基本文章信息 */
export default interface SimpleArticleDTO {
	/** 文章Id */
	id: ArticleDTO["articleId"];
	/** 文章标题 */
	title: ArticleDTO["title"];
	/** 文章排序 */
	sort: Sort;
	/** 创建时间 */
	createTime: ArticleDTO["createTime"];
}
