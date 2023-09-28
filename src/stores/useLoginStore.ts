import { getHomeData } from "@/apis/articles";
import { getLogout, postLogin } from "@/apis/user";
import BaseUserInfoDTO from "@/models/user/BaseUserInfoDTO.model";
import { create } from "zustand";

type UseLoginStore = {
	/** 用户信息 */
	userInfo?: BaseUserInfoDTO;
	/** 获取用户信息 */
	getUserInfo: () => Promise<void>;
	/** 登陆 */
	login: (username: string, password: string) => Promise<void>;
	/** 登出 */
	logout: () => Promise<void>;
};

/** 用户登陆状态管理 */
const useLoginStore = create<UseLoginStore>((set) => ({
	userInfo: undefined,
	getUserInfo: async () => {
		// TODO: 获取当前用户信息，顺便处理首页登陆逻辑
		const { user } = await getHomeData();
		console.log(user, "首页用户信息");
		if (user) {
			set(() => ({ userInfo: user }));
		} else {
			// TODO: 未登录提醒
		}
	},
	login: async (username: string, password: string) => {
		let userInfo: BaseUserInfoDTO | undefined = undefined;
		try {
			userInfo = await postLogin(username, password);
		} catch (e) {
			// 登录失败提醒
			alert(e);
		}
		if (userInfo) set(() => ({ userInfo }));
	},
	logout: async () => {
		await getLogout();
		set(() => ({ userInfo: undefined }));
	},
}));

export default useLoginStore;
