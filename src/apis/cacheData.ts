import xFetch from ".";
import { ArticleCategory, ArticleTag } from "@/models";

/** 查询文章分类 */
export function getCategorys() {
	return xFetch<ArticleCategory>("article/category");
}

/** 查询文章标签 */
export function getTags() {
	return xFetch<ArticleTag>("article/tags");
}
