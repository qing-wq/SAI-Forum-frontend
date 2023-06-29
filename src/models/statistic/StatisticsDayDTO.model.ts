type Date = string;
type Count = number;
/** 日统计数据 */
export default interface StatisticsDayDTO {
	/** 日期 */
	date: Date;
	/** 数量 */
	count: Count;
}
