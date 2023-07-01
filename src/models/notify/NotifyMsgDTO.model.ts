import BaseUserInfoDTO from "../user/BaseUserInfoDTO.model";
import ArticleDTO from "@/models/article/ArticleDTO.model";
import BaseCommentDTO from "@/models/comment/BaseCommentDTO.model";

type MsgId = number;
type RelatedId = ArticleDTO["articleId"] | BaseCommentDTO["commentId"];
type RelatedInfo = string;
type OperateUserId = BaseUserInfoDTO["userId"];
type OperateUserName = BaseUserInfoDTO["userName"];
type OperateUserPhoto = BaseUserInfoDTO["photo"];
enum NotifyTypeEnum {
	"",
	"评论",
	"回复",
	"点赞",
	"收藏",
	"关注",
	"系统",
}
enum NotifyMsgEnum {
	"comment" = 1,
	"deleteComment" = -1,
	"reply" = 2,
	"deleteReply" = -2,
	"praise" = 3,
	"cancelPraise" = -3,
	"collect" = 4,
	"cancelCollect" = -4,
	"follow" = 5,
	"cancelFollow" = -5,
	"system" = 6,
}
type State = boolean;
type Time = string;

/**消息通知*/
export default interface NotifyMsgDTO {
	/** 消息Id */
	msgId: MsgId;
	/**关联(文章、评论)Id*/
	relatedId: RelatedId;
	/**关联(文章、评论)信息*/
	relatedInfo: RelatedInfo;
	/**消息来源用户Id*/
	operateUserId: OperateUserId;
	/** 消息来源用户名 */
	operateUserName: OperateUserName;
	/** 消息来源用户头像 */
	operateUserPhoto: OperateUserPhoto;
	/** 消息类型 */
	type: NotifyTypeEnum;
	/** 消息正文 */
	msg: NotifyMsgEnum;
	/** 是否已读 */
	state: State;
	/** 消息产生时间 */
	createTime: Time;
}
