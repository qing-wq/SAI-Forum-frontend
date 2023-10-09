import ResVO from "@/models/Response/Response.model";
import IndexVo from "./index/IndexVo";
import ArticleDetailVo from "./article/ArticleDetailVo.model";
import UserHomeVo from "./user/UserHomeVo.model";
import ImageVO from "./article/ImageVO.model";
import CategoryDTO from "./article/CategoryDTO.model";
import TagDTO from "./article/TagDTO.model";
import ArticleDTO from "./article/ArticleDTO.model";
import PageListVo from "./page/PageListVo.model";
import BaseUserInfoDTO from "./user/BaseUserInfoDTO.model";
import NotifyMsgDTO from "./notify/NotifyMsgDTO.model";
import { NoticeType } from "@/apis/notice";

/** 反向推导Promise */
export type Await<T extends Promise<any>> = T extends Promise<infer P>
	? P
	: never;

/** 首页接口 */
export type HomeData = IndexVo;

/** 文章分页查询接口 */
export type ArticleList = PageListVo<ArticleDTO>;

/** 文章详情接口 */
export type ArticleDetail = ArticleDetailVo;

/** 用户主页接口 */
export type UserInfo = UserHomeVo;

/** 图片上传接口 */
export type UploadImage = ImageVO;

/** 文章分类接口 */
export type ArticleCategory = CategoryDTO[];

/** 文章标签接口 */
export type ArticleTag = TagDTO[];

/** 文章提交接口 */
export type ArticleSave = ArticleDTO["articleId"];

/** 生成文章摘要接口 */
export type ArticleSummary = ArticleDTO["summary"];

/** 登陆接口 */
export type LoginInfo = BaseUserInfoDTO;

/** 登出接口 */
export type LogoutInfo = string;

/** 草稿分页查询接口  */
export type DraftList = ArticleList;

/** 消息查询接口 */
export type NoticeResVo = {
	list: PageListVo<NotifyMsgDTO>;
	unreadCountMap: Record<NoticeType, number>;
};
