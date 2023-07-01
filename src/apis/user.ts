import xFetch from ".";
import { UserInfo } from "@/models";

/**
 * 请求用户数据
 */
export function getUserInfo(id: string) {
	return new Promise<UserInfo["result"]>((resolve, reject) => {
		xFetch<UserInfo>(`user/${id}?`).then((res) => {
			resolve(res.result);
		});
	});
}
