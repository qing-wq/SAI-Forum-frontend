import xFetch from ".";
import { ArticleDetail, HomeData } from "@/models";

/**
 * 请求首页文章
 * @param {string} category
 */
export function getArticlesByCategory(category = "全部") {
	return new Promise<HomeData["result"]>((resolve, reject) => {
		xFetch<HomeData>(`?category=${category}`).then((res) => {
			resolve(res.result);
		});
	});
}

/**
 * 请求文章详情
 * @param {string} id
 */
export function getArticle(id: string) {
	return new Promise<ArticleDetail["result"]>((resolve, reject) => {
		xFetch<ArticleDetail>(`detail/${id}`).then((res) => {
			resolve(res.result);
		});
	});
}
