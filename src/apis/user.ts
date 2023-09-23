import xFetch from ".";
import { Await, LoginInfo, UserInfo } from "@/models";

/**
 * 请求用户数据
 */
export function getUserInfo(id: string) {
	return xFetch<UserInfo>(`user/${id}?`);
}

/**
 * 关注/取关用户
 */
export function postUserFollow(
	/** 目标用户Id */
	userId: number,
	/** 关注者Id */
	followUserId: number,
	/** 是否关注 */
	followed: boolean
) {
	return xFetch("user/follow", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ userId, followUserId, followed }),
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
