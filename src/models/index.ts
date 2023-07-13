import ResVO from "@/models/Response/Response.model";
import IndexVo from "./index/IndexVo";
import ArticleDetailVo from "./article/ArticleDetailVo.model";
import UserHomeVo from "./user/UserHomeVo.model";
import ImageVO from "./article/ImageVO.model";
import CategoryDTO from "./article/CategoryDTO.model";
import TagDTO from "./article/TagDTO.model";
import ArticleDTO from "./article/ArticleDTO.model";

/** 反向推导Promise */
export type Await<T extends Promise<any>> = T extends Promise<infer P>
	? P
	: never;

/** 首页接口 */
export interface HomeData extends ResVO<IndexVo> {}

/** 文章详情接口 */
export interface ArticleDetail extends ResVO<ArticleDetailVo> {}

/** 用户主页接口 */
export interface UserInfo extends ResVO<UserHomeVo> {}

/** 图片上传接口 */
export interface UploadImage extends ResVO<ImageVO> {}

/** 文章分类接口 */
export interface ArticleCategory extends ResVO<CategoryDTO[]> {}

/** 文章标签接口 */
export interface ArticleTag extends ResVO<TagDTO[]> {}

/** 文章提交接口 */
export interface ArticleSave extends ResVO<ArticleDTO["articleId"]> {}

/** 生成文章摘要接口 */
export interface ArticleSummary extends ResVO<ArticleDTO["summary"]> {}
