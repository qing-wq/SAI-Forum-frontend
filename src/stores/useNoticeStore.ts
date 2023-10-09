import { NoticeType, getNoticeList } from "@/apis/notice";
import NotifyMsgDTO from "@/models/notify/NotifyMsgDTO.model";
import { create } from "zustand";

type UseNoticeStore = {
	noticeList: Partial<Record<NoticeType, NotifyMsgDTO[]>>;
	hasMore: Partial<Record<NoticeType, boolean>>;
	unreadCountMap: Record<NoticeType, number>;
	hasNewNotice: boolean;
	/** 轮询标记 */
	polling: boolean;
	loadNoticeList: (type: NoticeType) => Promise<void>;
};

const useNoticeStore = create<UseNoticeStore>((set, get) => ({
	noticeList: {},
	hasMore: {},
	unreadCountMap: {
		comment: 0,
		reply: 0,
		praise: 0,
		collect: 0,
		follow: 0,
		system: 0,
	},
	hasNewNotice: false,
	polling: true,
	loadNoticeList: async (type: NoticeType = "comment") => {
		// 如果不需要轮询，直接返回
		if (!get().polling) return;
		getNoticeList(type).then((res) => {
			set((state) => ({
				noticeList: { ...state.noticeList, [type]: res.list.list },
				hasMore: { ...state.hasMore, [type]: res.list.hasMore },
				unreadCountMap: res.unreadCountMap,
			}));
			let hasNew = false;
			// 如果有新消息，设置标记
			for (let key in res.unreadCountMap) {
				if (res.unreadCountMap[key as NoticeType] > 0) {
					hasNew = true;
					break;
				}
			}
			set({ hasNewNotice: hasNew });
		});
	},
}));

export default useNoticeStore;
