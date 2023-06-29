type PraiseCount = number;
type ReadCount = number;
type CollectionCount = number;
type CommentCount = number;

/** 文章统计数 */
export default interface ArticleFootCountDTO {
	/** 文章点赞数 */
	praiseCount: PraiseCount;
	/** 文章阅读数 */
	readCount: ReadCount;
	/** 文章收藏数 */
	collectionCount: CollectionCount;
	/** 文章评论数 */
	commentCount: CommentCount;
}
