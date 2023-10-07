import PageListVo from "@/models/page/PageListVo.model";
import xFetch from ".";
import { ArticleCategory, ArticleTag } from "@/models";
import TagDTO from "@/models/article/TagDTO.model";

/** 查询文章分类 */
export function getCategorys() {
	return xFetch<ArticleCategory>("article/category");
}

/** 查询文章标签 */
export function getTags(page: number) {
	// TODO: 分页查询
	return xFetch<PageListVo<TagDTO>>(`article/tags?page=${page}&pageSize=10`);
}
