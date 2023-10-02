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
	return xFetch<HomeData>(`?category=${category}`);
}

/**
 * 分页请求文章接口
 */
export function getArticlesPerPage(categoryId: number, page: number) {
	return xFetch<ArticleList>(
		`article/api/list/category/${categoryId}?page=${page}`,
		{
			method: "GET",
		}
	);
}

/**
 * 请求文章详情
 * @param {string} id
 */
export function getArticle(id: number) {
	return xFetch<ArticleDetail>(`article/detail/${id}`);
}

/**
 * 上传图片
 */
export function postImage(image: File) {
	const formdata = new FormData();
	formdata.append("image", image);
	console.log(image);
	return xFetch<UploadImage>("image/upload", {
		method: "POST",
		body: formdata,
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

/** 初始化草稿接口 */
export function postArticleInit(articleInfo: ArticlePostReq) {
	return xFetch<ArticleSave>("article/api/init", {
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

export enum ArticleInterationOperate {
	"点赞" = 2,
	"收藏" = 3,
	"取消点赞" = 4,
	"取消收藏" = 5,
}

/**
 * 文章互动
 */
export function articleInteraction(
	articleId: number,
	operate: ArticleInterationOperate
) {
	return xFetch<boolean>(
		`article/favor?articleId=${articleId}&operate=${operate}`
	);
}

export enum CommentInterationType {
	"点赞" = 2,
	"取消点赞" = 4,
}

/**
 * 文章评论点赞
 */
export function commentInteraction(
	commentId: number,
	type: CommentInterationType
) {
	return xFetch<boolean>(
		`comment/api/favor?commentId=${commentId}&type=${type}`
	);
}
