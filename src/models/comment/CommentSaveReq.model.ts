import BaseCommentDTO from "@/models/comment/BaseCommentDTO.model";
import SubCommentDTO from "@/models/comment/SubCommentDTO.model";
import TopCommentDTO from "@/models/comment/TopCommentDTO.model";

/**
 * 保存评论接口从基础评论DTO继承的必选属性
 */
type CommentSaveReqRequiredPropertyFromBaseCommentDTO =
	| "userId"
	| "commentContent";

/**
 * 保存评论接口从基础评论DTO继承的可选属性
 */
type CommentSaveReqOptionalPropertyFromBaseCommentDTO = "commentId";

/**
 * 文章Id
 */
// TODO: 将文章Id替换成DTO中的属性
type ArticleId = number;

/**
 * 创建、修改评论接口
 */
export default interface CommentSaveReq
	extends Pick<
			BaseCommentDTO,
			CommentSaveReqRequiredPropertyFromBaseCommentDTO
		>,
		Partial<
			Pick<
				BaseCommentDTO,
				CommentSaveReqOptionalPropertyFromBaseCommentDTO
			>
		> {
	articleId: ArticleId;
	parentCommentId: SubCommentDTO["parentContent"] | 0;
	topCommentId: TopCommentDTO["commentId"] | 0;
}
