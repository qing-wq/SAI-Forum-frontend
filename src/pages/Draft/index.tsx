import { deleteDraft, getDraftList } from "@/apis/draft";
import useAuthTo from "@/auth/useAuthTo";
import LoadPerPage from "@/components/LoadPerPage";
import MiddleView from "@/layouts/MiddleView";
import MiddleViewVertical from "@/layouts/MiddleViewVertical";
import ArticleDTO from "@/models/article/ArticleDTO.model";
import DraftDTO from "@/models/article/DraftDTO.model";
import dayjs from "dayjs";
import { useLayoutEffect, useRef, useState } from "react";

const DraftList = () => {
	const [draftList, setDraftList] = useState<DraftDTO[]>([]);
	const draftPage = useRef<number>(0);
	const [hasMoreDraft, setHasMoreDraft] = useState<boolean>(true);
	const authTo = useAuthTo();
	/** 获取一页草稿列表(非自增) */
	const getDraftListPerPage = async (
		page: number,
		reload: boolean = false
	) => {
		const res = await getDraftList(page);
		setDraftList((list) => (reload ? res.list : list.concat(res.list)));
		setHasMoreDraft(res.hasMore);
		draftPage.current = page;
		return res;
	};
	useLayoutEffect(() => {
		// 获取草稿列表
		// getDraftListPerPage(++draftPage.current);
		return () => {
			setDraftList([]);
			setHasMoreDraft(true);
		};
	}, []);
	// TODO: 加载更多
	return (
		<MiddleViewVertical>
  <div className="max-w-[700px] w-full mx-auto py-6">
    <h1 className="text-2xl font-bold mb-4 text-[#222] flex items-center gap-2">
  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-[#7c3aed]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 7V5a2 2 0 012-2h6a2 2 0 012 2v2m-10 0h10m-10 0v10a2 2 0 002 2h6a2 2 0 002-2V7m-10 0v10m10-10v10" />
  </svg>
  草稿箱
</h1>
    <div className="border-b border-purple-100 mb-4" />
    {draftList.length === 0 ? (
      <div className="flex flex-col items-center justify-center py-20 text-gray-400">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
        <p className="text-lg">暂无草稿，快去创作一篇吧～</p>
      </div>
    ) : (
      <div className="space-y-4">
        {draftList.map((draft) => (
          <DraftItem
            key={draft.id}
            draftInfo={draft}
            onClick={authTo}
            reloadData={() => {
              getDraftListPerPage(1, true);
            }}
          />
        ))}
      </div>
    )}
    <div className="mt-6">
      <LoadPerPage
        ended={!hasMoreDraft}
        loadFunc={() => {
          getDraftListPerPage(++draftPage.current);
        }}
        successShow={<div></div>}
      >
        <div className="text-gray-400 text-center">加载中...</div>
      </LoadPerPage>
    </div>
  </div>
</MiddleViewVertical>
	);
};

const DraftItem = ({
	draftInfo,
	onClick,
	reloadData,
}: {
	draftInfo: DraftDTO;
	onClick: Function;
	reloadData: Function;
}) => {
	return (
		<div className="w-full bg-white rounded-xl shadow-sm border border-purple-50 px-6 py-4 transition hover:shadow-md flex flex-col gap-2">
  <div className="flex items-center justify-between">
    <h2
      className="text-l font-medium text-gray-800 hover:text-[#7c3aed] cursor-pointer line-clamp-1"
      onClick={() => onClick("/edit-article/" + draftInfo.id + "/0", false, true)}
    >
      {draftInfo.title || "无标题"}
    </h2>
    <div className="flex gap-2">
  <button
    className="btn btn-sm px-3 py-1 btn-primary text-white rounded-md hover:bg-blue-600 transition font-bold"
    onClick={() => onClick("/edit-article/" + draftInfo.id + "/0", false, true)}
  >
    编辑
  </button>
  <button
    className="btn btn-sm px-3 py-1 btn-secondary text-white rounded-md hover:bg-red-600 transition font-bold"
    onClick={async () => {
      try {
        await deleteDraft(draftInfo.id);
        reloadData();
      } catch (e) {
        // TODO: 删除失败提醒
        console.error(e);
      }
    }}
  >
    删除
  </button>
</div>
  </div>
  <div className="flex items-center text-xs text-gray-400 gap-4">
    <span>
      {dayjs(draftInfo.updateTime).format("YYYY年MM月DD日 HH:mm")}
    </span>
  </div>
</div>
	);
};

/**
 * 草稿交互
 */
// 已废弃 DraftInteraction 组件

export default DraftList;
