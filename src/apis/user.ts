import xFetch from ".";
import { Await, LoginInfo, LogoutInfo, UserInfo } from "@/models";

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
export async function getLogout() {
	return xFetch<LogoutInfo>("admin/login/logout");
}
