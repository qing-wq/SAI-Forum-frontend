type SelectType = string;
type SelectDesc = string;
type Selected = boolean;

/** 标签选择DTO */
export default interface TagSelectDTO {
	/** 选择类型 */
	selectType: SelectType;
	/** 描述 */
	selectDesc: SelectDesc;
	/** 是否选中 */
	selected: Selected;
}
