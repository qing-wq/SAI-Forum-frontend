import BaseUserInfoDTO from "../BaseUserInfoDTO.model";

/**
 * 评论中的用户信息
 */
type userInfoInComment = "userId" | "userName";

/**
 * 评论时间
 */
type CommentTime = string;

/**
 * 评论内容
 */
type CommentContent = string;

/**
 * 评论Id
 */
type CommentId = number;

/**
 * 获得点赞数
 */
type PraiseCount = number;

/**
 * 是否已点赞
 */
type Praised = boolean;

/**
 * 基础评论DTO
 */
export default interface BaseCommentDTO
	extends Pick<BaseUserInfoDTO, userInfoInComment> {
	userPhoto: BaseUserInfoDTO["photo"];
	commentTime: CommentTime;
	commentContent: CommentContent;
	commentId: CommentId;
	praiseCount: PraiseCount;
	praised: Praised;
}
