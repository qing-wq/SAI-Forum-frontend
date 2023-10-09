import { NoticeType } from "@/apis/notice";
import UserAvatar from "@/components/UserAvatar";
import MiddleViewVertical from "@/layouts/MiddleViewVertical";
import NotifyMsgDTO from "@/models/notify/NotifyMsgDTO.model";
import useNoticeStore from "@/stores/useNoticeStore";
import dayjs from "dayjs";
import { useEffect, useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";

/**
 * 消息页面
 */
const Message = () => {
	const noticeList = useNoticeStore((state) => state.noticeList);
	const loadNoticeList = useNoticeStore((state) => state.loadNoticeList);
	const unreadCountMap = useNoticeStore((state) => state.unreadCountMap);
	const [tab, setTab] = useState<NoticeType>("comment");
	useLayoutEffect(() => {
		loadNoticeList(tab);
	}, [tab]);
	return (
		<MiddleViewVertical
			top={
				<div className='mycard p-2'>
					<h1 className='text-2xl font-bold'>消息页面</h1>
					<div className='divider m-0' />
				</div>
			}
		>
			<div className='mycard w-full p-2'>
				<MianTab
					curTab={tab}
					setCurTab={setTab}
					unreadCountMap={unreadCountMap}
				/>
				<NoticeList noticeList={noticeList[tab]} />
			</div>
		</MiddleViewVertical>
	);
};

const MianTab = ({
	curTab,
	setCurTab,
	unreadCountMap,
}: {
	curTab: NoticeType;
	setCurTab: Function;
	unreadCountMap: Record<NoticeType, number>;
}) => {
	const tabMap: Partial<Record<NoticeType, string>> = {
		comment: "评论",
		follow: "关注",
		reply: "回复",
		praise: "点赞",
		collect: "收藏夹",
		system: "系统",
	};
	return (
		<div className='tabs w-full flex-nowrap font-bold'>
			{Object.entries(tabMap).map(([key, value]) => (
				<a
					key={key}
					className={`tab tab-lg tab-lifted !px-8 rounded-t-xl indicator ${
						curTab === key ? "tab-active" : ""
					}`}
					onClick={() => setCurTab(key)}
				>
					{value}
					{unreadCountMap[key as NoticeType] ? (
						<span className='indicator-item badge badge-secondary'>
							{unreadCountMap[key as NoticeType]}
						</span>
					) : null}
				</a>
			))}
			<div className='flex-1 tab tab-lifted self-end cursor-default' />
		</div>
	);
};

const NoticeList = ({ noticeList }: { noticeList: NotifyMsgDTO[] }) => {
	return (
		<div className='w-full px-2'>
			{noticeList.map((item) => {
				return <NoticeItem key={item.msgId} item={item} />;
			})}
		</div>
	);
};

const NoticeItem = ({ item }: { item: NotifyMsgDTO }) => {
	return (
		<div className={`w-full  py-2 ${item.state ? "text-gray-500" : " "}`}>
			<h2 className='text-2xl'>{item.msg}</h2>
			<span>
				<Link
					className='text-primary cursor-pointer'
					to={`/article/${item.relatedId}`}
				>
					《{item.relatedInfo}》
				</Link>
			</span>
			<span className='flex justify-between items-center'>
				<p>{dayjs(item.createTime).format("YYYY-MM-DD HH:mm:ss")}</p>
				<p className='text-center align-middle'>
					来自
					<Link
						className='text-primary cursor-pointer'
						to={`/user/${item.operateUserId}`}
					>
						{item.operateUserName}
						<UserAvatar src={item.operateUserPhoto} size='mid' />
					</Link>
				</p>
			</span>
			<div className='divider m-0' />
		</div>
	);
};

export default Message;
