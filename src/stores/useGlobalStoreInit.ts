import { useLayoutEffect } from "react";
import useCategorysStore from "./useCategorysStore";
import useLoginStore from "./useLoginStore";
import useTagsStore from "./useTags";
import useNoticeStore from "./useNoticeStore";

/**
 * 全局状态初始化数据
 */
const useGlobalStoreInit = () => {
	/** 初始化分类数据 */
	const categorysInit = useCategorysStore((states) => states.getCategorys);

	/** 初始化标签数据 */
	const tagsInit = useTagsStore((state) => state.getTags);

	/** 初始化登陆数据 */
	const loginInit = useLoginStore((state) => state.getUserInfo);

	/** 获取消息数据 */
	const getNoticeList = useNoticeStore((state) => state.loadNoticeList);

	return () => {
		useLayoutEffect(() => {
			categorysInit();
			tagsInit();
			loginInit();
			getNoticeList();
			const timer = setInterval(() => {
				getNoticeList();
			}, 30000);
			return () => {
				clearInterval(timer);
			};
		}, []);
	};
};

export default useGlobalStoreInit;
