import ResVo from "@/models/Response/Response.model";
import IndexVo from "./index/IndexVo";
import ArticleDetailVo from "./article/ArticleDetailVo";
import UserHomeVo from "./user/UserHomeVo.model";

/** 反向推导Promise */
export type UnPromise<T extends Promise<any>> = T extends Promise<infer P>
	? P
	: never;

/** 首页接口 */
export interface HomeData extends ResVo<IndexVo> {}

/** 文章详情接口 */
export interface ArticleDetail extends ResVo<ArticleDetailVo> {}

/** 用户主页接口 */
export interface UserInfo extends ResVo<UserHomeVo> {}
