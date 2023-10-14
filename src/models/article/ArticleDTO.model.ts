import SimpleUserInfoDTO from "@/models/user/SimpleUserInfoDTO.model";
import CategoryDTO from "@/models/article/CategoryDTO.model";
import TagDTO from "@/models/article/TagDTO.model";
import ArticleFootCountDTO from "@/models/article/ArticleFootCountDTO.model";

type ArticleId = number;
enum ArticleTypeEnum {
	"",
	"博文",
	"问答",
}
type Title = string;
type ShortTitle = string;
type Summary = string;
type Cover = string;
type Content = string;
enum SourceTypeEnum {
	"",
	"转载",
	"原创",
	"翻译",
}
type SourceUrl = string;
type Status = 0 | 1;
type OfficalStat = boolean;
type ToppingStat = boolean;
type CreamStat = boolean;
type Time = string;
type Praised = boolean;
type Commented = boolean;
type Collected = boolean;

/** 文章DTO */
export default interface ArticleDTO {
	/** 文章Id */
	articleId: ArticleId;
	/**
	 * 文章类型
	 * 1-博文
	 * 2-问答
	 */
	articleType: ArticleTypeEnum;
	/** 作者uid */
	author: SimpleUserInfoDTO["userId"];
	/** 作者名 */
	authorName: SimpleUserInfoDTO["name"];
	/** 作者头像 */
	authorAvatar: SimpleUserInfoDTO["avatar"];
	/** 文章标题 */
	title: Title;
	/** 短标题 */
	shortTitle: ShortTitle;
	/** 简介 */
	summary: Summary;
	/** 封面 */
	picture: Cover;
	/** 正文 */
	content: Content;
	/**
	 * 文章来源
	 * 1-转载
	 * 2-原创
	 * 3-翻译
	 */
	sourceType: SourceTypeEnum;
	/** 原文地址 */
	sourceUrl?: SourceUrl;
	/** 是否发布 */
	status: Status;
	/** 是否官方 */
	officalStat: OfficalStat;
	/** 是否置顶 */
	toppingStat: ToppingStat;
	/** 是否加精 */
	creamStat: CreamStat;
	/** 创建时间 */
	createTime: Time;
	/** 最后更新时间 */
	lastUpdateTime: Time;
	/** 文章分类 */
	category: CategoryDTO;
	/** 标签 */
	tags: TagDTO[];
	/** 是否点赞过 */
	praised: Praised;
	/** 是否评论过 */
	commented: Commented;
	/** 是否收藏过 */
	collected: Collected;
	/** 文章统计数 */
	count: ArticleFootCountDTO;
	/** 点赞用户信息 */
	praisedUsers: SimpleUserInfoDTO[];
}
