import BaseCommentDTO from "@/models/comment/BaseCommentDTO.model";

type ParentContent = string;

/**子评论信息DTO*/
export default interface SubCommentDTO extends BaseCommentDTO {
	/**父评论内容*/
	parentContent: ParentContent;
}
