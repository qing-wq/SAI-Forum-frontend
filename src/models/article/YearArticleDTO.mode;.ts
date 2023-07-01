type Year = string;
type ArticleCount = number;
/** 年度文章数据 */
export default interface YearArticleDTO {
	/** 年份 */
	year: Year;
	/** 文章数量 */
	articleCount: ArticleCount;
}
