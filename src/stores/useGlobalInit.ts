import useCategorys from "./useCategorys";
import useTags from "./useTags";

/**
 * 全局初始化数据
 */
const useGlobalInit = () => {
	/** 初始化分类数据 */
	const categorysInit = useCategorys((states) => states.getCategorys);
	categorysInit();
	/** 初始化标签数据 */
	const tagsInit = useTags((state) => state.getTags);
	tagsInit();
};

export default useGlobalInit;
