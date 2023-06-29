type PvCount = number;
type UserCount = number;
type ArticleCount = number;

/** 统计数据 */
export default interface StatisticsCountDTO {
	/** 统计计数 */
	pvCount: PvCount;
	/** 总用户数 */
	userCount: UserCount;
	/** 文章数量 */
	articleCount: ArticleCount;
}
