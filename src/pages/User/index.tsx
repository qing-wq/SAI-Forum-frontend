import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUserInfo } from "../../apis/user";
import MiddleView from "../../layouts/MiddleView";
import UserInfo from "../../components/UserInfo";
import UserArticles from "./UserArticles";
import OtherData from "./OtherData";
import Loading from "../../components/Loading";
import { Await } from "@/models";
import { useNavigate } from "react-router-dom";
import useLoginStore from "@/stores/useLoginStore";
import MiddleViewVertical from "@/layouts/MiddleViewVertical";

export default function User() {
	const { id } = useParams();
	// 当前已登录用户信息
	const currentUser = useLoginStore((state) => state.userInfo);
	// 访问用户信息
	const [userData, setUserData] =
		useState<Await<ReturnType<typeof getUserInfo>>>();
	const navigate = useNavigate();
	const getUserInfoById = (id: string) => {
		getUserInfo(id).then((res) => {
			setUserData(res);
		});
	};
	useEffect(() => {
		// 访问自己主页路由跳转
		if (id === "self") {
			if (!currentUser) navigate("/", { replace: true });
			else navigate(`/user/${currentUser.id}`, { replace: true });
		} else if (id) getUserInfoById(id);
		return () => {};
	}, [id]);

	return (
		<>
			{userData ? (
				<MiddleViewVertical
					top={
						<UserInfo
							info={userData.userHome}
							refresh={() => {
								if (id) getUserInfoById(id);
							}}
						/>
					}
				>
					<UserArticles articles={userData.homeSelectList} />
					<OtherData info={userData.userHome} />
				</MiddleViewVertical>
			) : (
				<Loading />
			)}
		</>
	);
}
