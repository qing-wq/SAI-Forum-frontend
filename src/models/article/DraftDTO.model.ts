import ArticleDTO from "./ArticleDTO.model";

type DraftDTOPropertyFromArticleDTO =
	| "articleId"
	| "title"
	| "shortTitle"
	| "picture"
	| "summary"
	| "content"
	| "sourceUrl"
	| "createTime";

type CategoryId = ArticleDTO["category"]["categoryId"];

/** 草稿DTO */
export default interface DraftDTO
	extends Pick<ArticleDTO, DraftDTOPropertyFromArticleDTO> {
	/** 分类Id */
	categoryId: CategoryId;
	/** 文章来源 */
	source: ArticleDTO["sourceType"];
	/** 用户Id */
	userId: ArticleDTO["author"];
	/** 更新时间 */
	updateTime: ArticleDTO["lastUpdateTime"];
	/** 草稿Id */
	id: ArticleDTO["articleId"];
	/** tagId */
	tagIds: ArticleDTO["tags"][number]["tagId"][];
}
