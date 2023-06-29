import BaseCommentDTO from "@/models/comment/BaseCommentDTO.model";
import SubCommentDTO from "@/models/comment/SubCommentDTO.model";
import TopCommentDTO from "@/models/comment/TopCommentDTO.model";

/**保存评论接口从基础评论DTO继承的必选属性*/
type CommentSaveReqRequiredPropertyFromBaseCommentDTO =
	| "userId"
	| "commentContent";

/**保存评论接口从基础评论DTO继承的可选属性*/
type CommentSaveReqOptionalPropertyFromBaseCommentDTO = "commentId";

// TODO: 将文章Id替换成DTO中的属性
type ArticleId = number;

/**创建、修改评论接口*/
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
	/**文章Id*/
	articleId: ArticleId;
	/**父评论Id（无父评论则为 0 ） */
	parentCommentId: SubCommentDTO["parentContent"] | 0;
	/**顶级评论Id（本身为顶级评论则为 0 ） */
	topCommentId: TopCommentDTO["commentId"] | 0;
}
