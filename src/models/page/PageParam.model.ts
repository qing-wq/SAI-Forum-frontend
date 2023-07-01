type PageNum = number;
type PageSize = number;

/** 页面查询参数 */
export default interface PageParam {
	/** 请求页数(从1开始) */
	pageNum?: PageNum;
	/** 页面大小 */
	pageSize?: PageSize;
}
