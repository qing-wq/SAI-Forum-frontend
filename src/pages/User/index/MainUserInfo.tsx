import { useNavigate, useParams } from "react-router-dom";
import UserArticles from "./UserArticles";
import { useEffect, useLayoutEffect, useState } from "react";
import { HomeSelectType } from "@/apis/user";
import { UserInfo } from "@/models";

const MainUserInfo = ({
	handleTabChange,
	articles,
}: {
	handleTabChange: Function;
	articles: UserInfo["homeSelectList"];
}) => {
	const navigate = useNavigate();
	const [curTab, setCurTab] = useState<HomeSelectType>("article");
	const { id, tab } = useParams();

	useEffect(() => {
		// 路由tab参数处理
		switch (tab) {
			case "article":
				setCurTab("article");
				break;
			case "follow":
				setCurTab("follow");
				break;
			case "collection":
				setCurTab("collection");
				break;
			case "read":
				setCurTab("read");
				break;
			default:
				return navigate(`/user/${id}/article`, { replace: true });
		}
	}, [tab]);

	useLayoutEffect(() => {
		// TODO: 避免路由级更新
		navigate(`/user/${id}/${curTab}`, { replace: true });
		handleTabChange(curTab);
	}, [curTab]);
	return (
		<div className='mycard w-[79%] bg-base-100 p-4'>
			<MianTab curTab={curTab} setCurTab={setCurTab} />
			<UserArticles articles={articles} tab={curTab} />
		</div>
	);
};

const MianTab = ({
	curTab,
	setCurTab,
}: {
	curTab: HomeSelectType;
	setCurTab: Function;
}) => {
	const tabMap: Partial<Record<HomeSelectType, string>> = {
		article: "发布文章",
		// follow: "关注",
		collection: "收藏夹",
		read: "历史记录",
	};
	return (
		<div className='tabs w-full flex-nowrap font-bold'>
			{Object.entries(tabMap).map(([key, value]) => (
				<a
					key={key}
					className={`tab tab-lg tab-lifted !px-8 rounded-t-xl ${
						curTab === key ? "tab-active" : ""
					}`}
					onClick={() => setCurTab(key)}
				>
					{value}
				</a>
			))}
			<div className='flex-1 tab tab-lifted self-end cursor-default' />
		</div>
	);
};

export default MainUserInfo;
