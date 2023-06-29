import BaseUserInfoDTO from "@/models/user/BaseUserInfoDTO.model";

type FollowCount = number;
type FansCount = number;
type JoinDayCount = number;
type ArticleCount = number;
type PraiseCount = number;
type ReadCount = number;
type CollectionCount = number;
type Followed = boolean;
type InfoPercent = number;
type YearArticleList = [];
//TODO: Array[YearArticleDTO]

/** 用户主页信息 */
export default interface UserStatisticInfoDTO extends BaseUserInfoDTO {
	/**关注数*/
	followCount: FollowCount;
	/**粉丝数*/
	fansCount: FansCount;
	/**加入天数*/
	joinDayCount: JoinDayCount;
	/**发布文章数*/
	articleCount: ArticleCount;
	/**获得点赞数*/
	praiseCount: PraiseCount;
	/**文章被阅读数*/
	readCount: ReadCount;
	/**文章被收藏数*/
	collectionCount: CollectionCount;
	/**是否已关注*/
	followed: Followed;
	/**身份信息完整度（百分比）*/
	infoPercent: InfoPercent;
	/**创作历程*/
	yearArticleList: YearArticleList;
}
