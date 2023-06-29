import BaseUserInfoDTO from "./BaseUserInfoDTO.model";
/**
 * 关注数
 */
type FollowCount = number;

/**
 * 粉丝数
 */
type FansCount = number;

/**
 * 加入天数
 */
type JoinDayCount = number;

/**
 * 发布文章数
 */
type ArticleCount = number;

/**
 * 获得点赞数
 */
type PraiseCount = number;

/**
 * 文章被阅读数
 */
type ReadCount = number;

/**
 * 文章被收藏数
 */
type CollectionCount = number;

/**
 * 是否已关注
 */
type Followed = boolean;

/**
 * 身份信息完整度（百分比）
 */
type InfoPercent = number;

/**
 *  创作历程
 */
type YearArticleList = [];
//TODO: Array[YearArticleDTO]

export default interface UserStatisticInfoDTO extends BaseUserInfoDTO {
	followCount: FollowCount;
	fansCount: FansCount;
	joinDayCount: JoinDayCount;
	articleCount: ArticleCount;
	praiseCount: PraiseCount;
	readCount: ReadCount;
	collectionCount: CollectionCount;
	followed: Followed;
	infoPercent: InfoPercent;
	yearArticleList: YearArticleList;
}
