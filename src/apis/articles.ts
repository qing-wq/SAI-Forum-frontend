import ArticleDTO from "@/models/article/ArticleDTO.model";
import xFetch from ".";
import {
	ArticleDetail,
	ArticleSave,
	ArticleSummary,
	HomeData,
	UploadImage,
} from "@/models";
import ArticlePostReq from "@/models/article/ArticlePostReq.model";

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
export function getArticle(id: number) {
	return new Promise<ArticleDetail["result"]>((resolve, reject) => {
		xFetch<ArticleDetail>(`article/detail/${id}`).then((res) => {
			resolve(res.result);
		});
	});
}

/**
 * 上传图片
 */
export function postImage(image: File) {
	return new Promise<UploadImage["result"]>((resolve) => {
		xFetch<UploadImage>("image/upload", {
			method: "POST",
			body: image,
		}).then((res) => {
			resolve(res.result);
		});
	});
}

/**
 * 保存文章信息（作者发布、修改）
 */
export function postArticle(articleInfo: ArticlePostReq) {
	return xFetch<ArticleSave>("article/api/post", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(articleInfo),
	});
}

/**
 * 自动生成文章摘要
 */
export function generateSummary(content: ArticleDTO["summary"]) {
	return xFetch<ArticleSummary>("article/generateSummary", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ content }),
	});
}
