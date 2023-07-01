import ArticleDTO from "@/models/article/ArticleDTO.model";
import TagSelectDTO from "@/models/article/TagSelectDTO.model";
import PageListVo from "@/models/page/PageListVo.model";
import FollowUserInfoDTO from "@/models/user/FollowUserInfoDTO.model";
import UserStatisticInfoDTO from "@/models/user/UserStatisticInfoDTO.model";

enum FollowSelectTypeEnum {
	"",
	"follow",
	"fans",
}

/** 用户主页数据VO */
export default interface UserHomeVo {
	/** 用户主页选择标签 */
	homeSelectType: TagSelectDTO["selectDesc"];
	/** 用户主页全部标签 */
	homeSelectTags: TagSelectDTO[];
	/** 关注列表/粉丝列表 */
	followList: PageListVo<FollowUserInfoDTO>;
	/**
	 * 关注列表类型
	 * 'follow'-关注列表
	 * 'fans'-粉丝列表
	 */
	followSelectType: FollowSelectTypeEnum;
	// 关注者列表
	followSelectTags: TagSelectDTO[];
	/** 用户个人信息 */
	userHome: UserStatisticInfoDTO;
	/** 文章列表 */
	// TODO: 等后端校验属性名
	homeSelectList: PageListVo<ArticleDTO>;
}
