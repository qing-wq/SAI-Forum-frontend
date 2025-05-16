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
		<>
			<div className='bg-article-bg blur-sm opacity-10 fixed top-0 left-0 w-screen h-screen bg-no-repeat bg-cover z-bg' />
			<MiddleViewVertical
				top={
					<div className='mycard p-4 bg-gradient-to-r from-[#7c3aed]/5 to-[#ff1aff]/5'>
						<div className="flex items-center gap-3">
							<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#7c3aed]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
							</svg>
							<h1 className='text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r text-[#6a3ce3]'>消息通知</h1>
						</div>
						<div className='divider m-0 my-2' />
					</div>
				}
				children={
					<div className='mycard w-full p-2'>
						<MianTab
							curTab={tab}
							setCurTab={setTab}
							unreadCountMap={unreadCountMap}
						/>
						<NoticeList noticeList={noticeList[tab]} />
					</div>
				}
			>
			</MiddleViewVertical>
		</>
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
		<div className='tabs w-full flex-nowrap font-bold mb-4'>
			{Object.entries(tabMap).map(([key, value]) => (
				<a
					key={key}
					className={`tab tab-lg tab-lifted !px-8 rounded-t-xl indicator ${
						curTab === key ? "tab-active" : ""
					}`}
					onClick={() => setCurTab(key)}
				>
					{value}
					{/* 小红点提示：有未读消息且不是当前tab时显示红点 */}
					{unreadCountMap[key as NoticeType] > 0 && curTab !== key && (
						<span className="absolute top-2 right-3 w-2 h-2 rounded-full bg-[#ff1a1a] animate-pulse"></span>
					)}
					{/* 数字徽章，当前tab才显示数字 */}
					{unreadCountMap[key as NoticeType] > 0 && curTab === key && (
						<span className='indicator-item badge bg-gradient-to-r from-[#7c3aed] to-[#ff1aff] border-0 text-white'>
							{unreadCountMap[key as NoticeType]}
						</span>
					)}
				</a>
			))}
			<div className='flex-1 tab tab-lifted self-end cursor-default' />
		</div>
	);
};

const NoticeList = ({ noticeList }: { noticeList: NotifyMsgDTO[] }) => {
	return (
		<div className='w-full px-2 space-y-2'>
			{noticeList.length === 0 ? (
				<div className="flex flex-col items-center justify-center py-12 text-gray-500">
					<svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
					</svg>
					<p className="text-lg">暂无消息通知</p>
				</div>
			) : (
				noticeList.map((item) => {
					return <NoticeItem key={item.msgId} item={item} />;
				})
			)}
		</div>
	);
};

const NoticeItem = ({ item }: { item: NotifyMsgDTO }) => {
	return (
		<div className={`w-full p-4 rounded-xl transition-all duration-300 ${item.state
			? "bg-white shadow-sm"
			: "bg-gradient-to-r from-[#7c3aed]/5 to-[#ff1aff]/5 shadow-md border border-purple-100"}`}
		>
			<h2 className={`text-xl font-medium mb-2 ${item.state ? "text-gray-600" : "text-[#7c3aed]"}`}>{item.msg}</h2>
			<div className="mb-3">
				<Link
					className='text-[#ff1aff] hover:text-[#7c3aed] transition-colors duration-300 cursor-pointer font-medium'
					to={`/article/${item.relatedId}`}
				>
					《{item.relatedInfo}》
				</Link>
			</div>
			<div className='flex justify-between items-center text-sm text-gray-500'>
				<div className="flex items-center gap-1">
					<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
					</svg>
					<p>{dayjs(item.createTime).format("YYYY-MM-DD HH:mm:ss")}</p>
				</div>
				<div className='flex items-center gap-2'>
					<span>来自</span>
					<Link
						className='flex items-center gap-2 text-[#7c3aed] hover:text-[#ff1aff] transition-colors duration-300 cursor-pointer'
						to={`/user/${item.operateUserId}`}
					>
						<span>{item.operateUserName}</span>
						<UserAvatar src={item.operateUserPhoto} size='mid' />
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Message;
