import { getDraftList } from "@/apis/draft";
import useAuthTo from "@/auth/useAuthTo";
import MiddleView from "@/layouts/MiddleView";
import ArticleDTO from "@/models/article/ArticleDTO.model";
import dayjs from "dayjs";
import { useLayoutEffect, useState } from "react";

const DraftList = () => {
	const [draftList, setDraftList] = useState<ArticleDTO[]>([]);
	const [hasMoreDraft, setHasMoreDraft] = useState<boolean>(true);
	const authTo = useAuthTo();
	useLayoutEffect(() => {
		// 获取草稿列表
		getDraftList().then((res) => {
			setDraftList(res.list);
			setHasMoreDraft(res.hasMore);
		});
	}, []);
	return (
		<MiddleView>
			<div className='w-[800px] m-auto'>
				{draftList.map((draft) => (
					<DraftItem
						key={draft.articleId}
						draftInfo={draft}
						onClick={authTo}
					/>
				))}
			</div>
		</MiddleView>
	);
};

const DraftItem = ({
	draftInfo,
	onClick,
}: {
	draftInfo: ArticleDTO;
	onClick: Function;
}) => {
	return (
		<div className='w-full '>
			<h1
				className='text-xl font-black hover:text-primary cursor-pointer'
				onClick={() =>
					onClick("/edit-article/" + draftInfo.articleId, false, true)
				}
			>
				{draftInfo.title || "无标题"}
			</h1>
			<span className='text-gray-500 inline-flex gap-8'>
				<p>
					{dayjs(draftInfo.lastUpdateTime).format(
						"YYYY年MM月DD日 HH:mm"
					)}
				</p>
				<p>...</p>
			</span>
			<div className='my-1 divider' />
		</div>
	);
};

export default DraftList;
