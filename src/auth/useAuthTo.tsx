import useLoginStore from "@/stores/useLoginStore";
import { Path, useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

interface UseAuthTo {
	(
		path: string | Partial<Path>,
		loginMSG?: string | boolean,
		loginAction?: boolean
	): boolean;
	(path: number, loginMSG?: string | boolean, loginAction?: boolean): boolean;
}

/**
 * 路由跳转权限验证
 */
const useAuthTo = (): UseAuthTo => {
	const navigate = useNavigate();
	const auth = useAuth();
	return (path, loginMSG = false, loginAction = false) => {
		// 判断是否登录
		const isLogin = auth(loginMSG);
		if (!isLogin) {
			// TODO: 跳转登录页提示
			if (loginAction) navigate("/login");
			return false;
		}
		if (typeof path === "number") {
			navigate(path);
			return true;
		}
		navigate(path);
		return true;
	};
};

export default useAuthTo;
