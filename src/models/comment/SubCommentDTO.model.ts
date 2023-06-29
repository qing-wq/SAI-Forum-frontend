import BaseCommentDTO from "@/models/comment/BaseCommentDTO.model";

/**
 * 父评论内容
 */
type ParentContent = string;

/**
 * 子评论信息DTO
 */
export default interface SubCommentDTO extends BaseCommentDTO {
	parentContent: ParentContent;
}
