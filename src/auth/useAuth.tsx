import useLoginStore from "@/stores/useLoginStore";

/**
 * 权限管理
 */
const useAuth = () => {
	const userInfo = useLoginStore((state) => state.userInfo);
	return (loginMSG: string | boolean = true, callback?: Function) => {
		// 判断是否登录
		if (!userInfo) {
			if (loginMSG) {
				// TODO: 跳转登录页提示
				alert(typeof loginMSG === "string" ? loginMSG : "请先登录");
			}
			return false;
		}
		if (callback) callback();
		return true;
	};
};

export default useAuth;
