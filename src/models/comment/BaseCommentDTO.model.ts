import BaseUserInfoDTO from "@/models/user/BaseUserInfoDTO.model";

/**评论中的用户信息属性*/
type userInfoInComment = "userId" | "userName";
type CommentTime = string;
type CommentContent = string;
type CommentId = number;
type PraiseCount = number;
type Praised = boolean;

/**
 * 基础评论DTO
 */
export default interface BaseCommentDTO
	extends Pick<BaseUserInfoDTO, userInfoInComment> {
	/**用户头像 */
	userPhoto: BaseUserInfoDTO["photo"];
	/**评论时间*/
	commentTime: CommentTime;
	/**评论内容*/
	commentContent: CommentContent;
	/**评论Id*/
	commentId: CommentId;
	/**获得点赞数*/
	praiseCount: PraiseCount;
	/**是否已点赞*/
	praised: Praised;
}

const ii: BaseCommentDTO = {
	userPhoto: "",
	commentTime: "",
	commentContent: "",
	commentId: 0,
	praiseCount: 0,
	praised: false,
	userId: 0,
	userName: "",
};
