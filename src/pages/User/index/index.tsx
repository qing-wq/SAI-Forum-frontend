import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { HomeSelectType, getUserInfo } from "../../../apis/user";
import MiddleView from "../../../layouts/MiddleView";
import UserInfo from "../../../components/UserInfo";
import UserArticles from "./UserArticles";
import OtherData from "./OtherData";
import Loading from "../../../components/Loading";
import { Await } from "@/models";
import { useNavigate } from "react-router-dom";
import useLoginStore from "@/stores/useLoginStore";
import MiddleViewVertical from "@/layouts/MiddleViewVertical";
import MainUserInfo from "./MainUserInfo";

export default function User() {
	const { id } = useParams();
	const [curTab, setCurTab] = useState<HomeSelectType>("article");
	// 当前已登录用户信息
	const currentUser = useLoginStore((state) => state.userInfo);
	// 访问用户信息
	const [userData, setUserData] =
		useState<Await<ReturnType<typeof getUserInfo>>>();
	const navigate = useNavigate();
	const getUserInfoById = (id: string, tab: HomeSelectType) => {
		getUserInfo(id, tab).then((res) => {
			setUserData(res);
		});
	};
	useEffect(() => {
		// 访问自己主页路由跳转
		if (id === "self") {
			if (!currentUser) navigate("/", { replace: true });
			else navigate(`/user/${currentUser.userId}`, { replace: true });
		} else if (isNaN(Number(id))) navigate("/", { replace: true });
		else if (id) getUserInfoById(id, curTab);
		return () => {};
	}, [id, curTab]);

	return (
		<>
			{userData ? (
				<>
					<div className='bg-article-bg blur-sm opacity-10 fixed top-0 left-0 w-screen h-screen bg-no-repeat bg-cover z-bg' />
					<MiddleViewVertical
						top={
							<UserInfo
								info={userData.userHome}
								refresh={() => {
									if (id) getUserInfoById(id, curTab);
								}}
							/>
						}
					>
						<MainUserInfo
							handleTabChange={setCurTab}
							articles={userData.homeSelectList}
						/>
						{/* <UserArticles articles={userData.homeSelectList} /> */}
						<OtherData info={userData.userHome} />
					</MiddleViewVertical>
				</>
			) : (
				<Loading />
			)}
		</>
	);
}
