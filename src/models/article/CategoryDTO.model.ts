type CategoryId = number;
type Category = string;
type Rank = number;
type Status = boolean;
type Selected = boolean;
/** 文章分类 */
export default interface CategoryDTO {
	/** 分类Id */
	categoryId: CategoryId;
	/** 分类名 */
	category: Category;
	/** 分类级别 */
	rank: Rank;
	/** 是否发布 */
	status: Status;
	/** 是否已选择 */
	selected: Selected;
}
