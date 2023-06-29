type TagId = number;
type Tag = string;
type Status = boolean;
type Selected = boolean;
/** 文章标签DTO */
export default interface TagDTO {
	/** 文章Id */
	tagId: TagId;
	/** 标签名 */
	tag: Tag;
	/** 是否发布 */
	status: Status;
	/** 是否已选择 */
	selected: Selected;
}
