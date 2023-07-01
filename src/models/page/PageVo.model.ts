import PageParam from "./PageParam.model";

type PageTotal = number;

/** 页面信息VO */
export default interface PageVo<T = any> extends Required<PageParam> {
	/** 数据列表 */
	list: T[];
	/** 页面统计 */
	pageTotal: PageTotal;
}
