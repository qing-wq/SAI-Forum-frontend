import BaseCommentDTO from "@/models/comment/BaseCommentDTO.model";
import SubCommentDTO from "./SubCommentDTO.model";

type CommentCount = number;
type ChildComments = SubCommentDTO[];

/**子评论信息DTO*/
export default interface TopCommentDTO extends BaseCommentDTO {
	/**评论数量*/
	commentCount: CommentCount;
	/**子评论*/
	childComments: ChildComments;
}
