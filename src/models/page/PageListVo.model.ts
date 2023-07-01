type HasMore = boolean;
/** 页面列表VO */
export default interface PageListVo<T = any> {
	/** 分页数据列表 */
	list: T[];
	/** 是否有更多 */
	hasMore: HasMore;
}
