import ArticleDTO from "@/models/article/ArticleDTO.model";
import xFetch from ".";
import {
	ArticleDetail,
	ArticleList,
	ArticleSave,
	ArticleSummary,
	HomeData,
	UploadImage,
} from "@/models";
import ArticlePostReq from "@/models/article/ArticlePostReq.model";

/**
 * 请求首页文章与用户信息
 * @param {string} category
 */
export function getHomeData(category = "全部") {
	return new Promise<HomeData["result"]>((resolve, reject) => {
		xFetch<HomeData>(`?category=${category}`).then((res) => {
			resolve(res.result);
		});
	});
}

/**
 * 分页请求文章接口
 */
export function getArticlesPerPage(categoryId: number, page: number) {
	return new Promise<ArticleList["result"]>((resolve) =>
		xFetch<ArticleList>(
			`article/api/list/category/${categoryId}?page=${page}`,
			{
				method: "GET",
			}
		).then((res) => resolve(res.result))
	);
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
 * 文章新建、发布状态修改接口
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
 * 文章自动保存接口(草稿)
 */
export function saveArticle(articleInfo: ArticlePostReq) {
	return xFetch<ArticleSave>("draft/update", {
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

/** 评论信息 */
export interface PostCommentProp {
	/** 文章Id */
	articleId: number;
	/** 评论内容 */
	commentContent: string;
	/** 评论者Id */
	userId: number;
	/** 父评论Id */
	parentCommentId?: number;
	/** 顶级评论Id */
	topCommentId?: number;
}
/**
 * 发布评论
 */
export function postComment(commentInfo: PostCommentProp) {
	return xFetch<ArticleSave>("comment/api/post", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(commentInfo),
	});
}
