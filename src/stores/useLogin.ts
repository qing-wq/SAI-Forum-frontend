import { getHomeData } from "@/apis/articles";
import BaseUserInfoDTO from "@/models/user/BaseUserInfoDTO.model";
import { create } from "zustand";

type UseLogin = {
	userInfo?: BaseUserInfoDTO;
	getUserInfo: () => Promise<void>;
};

/** 用户登陆状态管理 */
const useLogin = create<UseLogin>((set) => ({
	userInfo: undefined,
	getUserInfo: async () => {
		// TODO: 获取当前用户信息，顺便处理首页登陆逻辑
		const { user } = await getHomeData();
		if (user) {
			set(() => ({ userInfo: user }));
		} else {
			// TODO: 未登录提醒
		}
	},
}));

export default useLogin;
