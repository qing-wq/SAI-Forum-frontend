import useCategorysStore from "./useCategorysStore";
import useLoginStore from "./useLoginStore";
import useTagsStore from "./useTags";

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

	return () => {
		categorysInit();
		tagsInit();
		loginInit();
	};
};

export default useGlobalStoreInit;
