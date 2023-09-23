import useArticleEditStore from "@/stores/useArticleEditStore";

/** 快速展开useArticle的Hook */
const useArticleEditInfo = () => {
	return useArticleEditStore((state) => ({
		articleInfo: state.articleInfo,
		articleSummaryAutoGenerate: state.articleSummaryAutoGenerate,
		saveArticleInfo: state.saveArticleInfo,
		saveArticleInfoBus: state.saveArticleInfoBus,
	}));
};

export default useArticleEditInfo;
