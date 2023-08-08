import { getHomeData } from "@/apis/articles";
import { postLogin } from "@/apis/user";
import BaseUserInfoDTO from "@/models/user/BaseUserInfoDTO.model";
import { create } from "zustand";

type UseLogin = {
	/** 用户信息 */
	userInfo?: BaseUserInfoDTO;
	/** 获取用户信息 */
	getUserInfo: () => Promise<void>;
	/** 登陆 */
	logn: (username: string, password: string) => Promise<void>;
};

/** 用户登陆状态管理 */
const useLogin = create<UseLogin>((set) => ({
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
	logn: async (username: string, password: string) => {
		const userInfo = await postLogin(username, password);
		set(() => ({ userInfo }));
	},
}));

export default useLogin;
