import ArticleDTO from "./ArticleDTO.model";
import CategoryDTO from "./CategoryDTO.model";
import DraftDTO from "./DraftDTO.model";
import TagDTO from "./TagDTO.model";

type ArticlePostReqOptionalPropertyFromArticleDTO =
	| "articleId"
	| "title"
	| "shortTitle"
	| "summary"
	| "content"
	| "picture"
	| "sourceUrl";
type ActionType = "POST" | "SAVE" | "DELETE";
/** 文章保存、修改信息 */
export default interface ArticlePostReq
	extends Partial<
		Pick<DraftDTO, ArticlePostReqOptionalPropertyFromArticleDTO>
	> {
	/** 草稿Id */
	draftId?: number;
	/** 分类Id */
	categoryId?: ArticleDTO["category"]["categoryId"];
	/** 标签Id */
	tagIds?: ArticleDTO["tags"][number]["tagId"][];
	/**
	 * 文章来源
	 * 1-转载
	 * 2-原创
	 * 3-翻译
	 */
	source?: ArticleDTO["sourceType"];
	/**
	 * 操作类型
	 * "POST" - 发表
	 * "SAVE" - 暂存
	 * "DELETE" - 删除
	 */
	actionType?: ActionType;
	/** 分类对象——兼容性写法 */
	// category?: CategoryDTO;
	/** 标签列表——兼容性写法 */
	// tags?: TagDTO[];
	/** 文章状态 */
	status?: ArticleDTO["status"];
}
