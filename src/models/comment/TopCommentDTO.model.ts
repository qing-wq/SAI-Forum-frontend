import BaseCommentDTO from "@/models/comment/BaseCommentDTO.model";
import SubCommentDTO from "./SubCommentDTO.model";

/**
 * 评论数量
 */
type CommentCount = number;

/**
 * 子评论
 */
type ChildComments = SubCommentDTO[];

/**
 * 子评论信息DTO
 */
export default interface TopCommentDTO extends BaseCommentDTO {
	commentCount: CommentCount;
	childComments: ChildComments;
}
