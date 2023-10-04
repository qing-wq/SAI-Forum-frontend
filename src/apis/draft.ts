import { DraftList } from "@/models";
import xFetch from ".";

/**
 * 获取草稿箱列表
 */
export const getDraftList = (page: number = 1, pageSize?: number) =>
	xFetch<DraftList>(
		`/draft/list?page=${page}${pageSize ? "&pageSize=" + pageSize : ""} `
	);

/**
 * 删除草稿
 */
export const deleteDraft = (draftId: number) =>
	xFetch<string>(`draft/del/${draftId}`);
