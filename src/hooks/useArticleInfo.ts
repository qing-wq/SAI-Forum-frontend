import { shallow } from "zustand/shallow";
import useArticle from "@/stores/useArticle";

/** 快速展开useArticle的Hook */
const useArticleInfo = () => {
	return useArticle(
		(state) => ({
			articleInfo: state.articleInfo,
			articleSummaryAutoGenerate: state.articleSummaryAutoGenerate,
			saveArticleInfo: state.saveArticleInfo,
			saveArticleInfoBus: state.saveArticleInfoBus,
		}),
		shallow
	);
};

export default useArticleInfo;
