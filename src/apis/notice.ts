import PageListVo from "@/models/page/PageListVo.model";
import xFetch from ".";
import NotifyMsgDTO from "@/models/notify/NotifyMsgDTO.model";
import { NoticeResVo } from "@/models";

export type NoticeType =
	| "comment"
	| "reply"
	| "praise"
	| "collect"
	| "follow"
	| "system";

/**
 * 获取消息列表
 */
export const getNoticeList = (type: NoticeType = "comment") =>
	xFetch<NoticeResVo>(`notice/${type}`);
