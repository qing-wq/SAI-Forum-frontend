import BaseUserInfoDTO from "@/models/user/BaseUserInfoDTO.model";
import xFetch from ".";
import { Await, LoginInfo, LogoutInfo, UserInfo } from "@/models";
import PageListVo from "@/models/page/PageListVo.model";
import ArticleDTO from "@/models/article/ArticleDTO.model";

export type HomeSelectType = "article" | "read" | "follow" | "collection";
type FollowSelectType = "follow" | "fans";
/**
 * 请求用户数据
 */
export function getUserInfo(
	id: string,
	homeSelectType: HomeSelectType = "article",
	followSelectType: FollowSelectType = "follow"
) {
	return xFetch<UserInfo>(
		`user/${id}?homeSelectType=${homeSelectType}&followSelectType=${followSelectType}`
	);
}

/**
 * 关注/取关用户
 */
export function postUserFollow(
	/** 目标用户Id */
	userId: number,
	/** 是否关注 */
	followed: boolean
) {
	return xFetch("user/follow", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ userId, followed }),
	});
}

/**
 * 用户登陆
 */
export async function postLogin(
	/** 用户名 */
	username: string,
	/** 密码 */
	password: string
) {
	return xFetch<LoginInfo>("admin/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: `username=${username}&password=${password}`,
	});
}

/**
 * 用户登出
 */
export function getLogout() {
	return xFetch<LogoutInfo>("admin/login/logout");
}

/**
 * 用户数据修改
 */
export function postUserInfo(userInfo: Partial<BaseUserInfoDTO>) {
	return xFetch<boolean>("user/saveInfo", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(userInfo),
	});
}

/**
 * 用户注册
 */
export function postRegister(
	/** 用户名 */
	username: string,
	/** 密码 */
	password: string,
	/** 邮箱 */
	email: string,
	/** 学号 */
	studentId?: string,
	/** 学院 */
	college?: string
) {
	return xFetch<boolean>("user/register", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ username, password, email }),
	});
}

/**
 * 用户数据分页获取
 */
export function getUserList(
	/** 用户Id */
	userId: number,
	/** 页码 */
	page: number,
	/** 类型 */
	homeSelectType: HomeSelectType = "article",
	/** 每页数量 */
	pageSize: number = 20
) {
	return xFetch<PageListVo<ArticleDTO>>(
		`user/list?page=${page}&pageSize=${pageSize}&homeSelectType=${homeSelectType}&userId=${userId}`
	);
}
