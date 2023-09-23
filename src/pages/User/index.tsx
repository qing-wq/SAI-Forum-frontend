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

export default function User() {
	const { id } = useParams();
	// 当前已登录用户信息
	const currentUser = useLoginStore((state) => state.userInfo);
	// 访问用户信息
	const [userData, setUserData] =
		useState<Await<ReturnType<typeof getUserInfo>>>();
	const navigate = useNavigate();
	useEffect(() => {
		if (id === "self") {
			if (!currentUser) navigate("/");
			else navigate(`/user/${currentUser.id}`);
		}
		if (id)
			getUserInfo(id).then((res) => {
				setUserData(res);
			});
		return () => {};
	}, [id]);

	return (
		<>
			{userData ? (
				<MiddleView>
					<UserInfo info={userData.userHome} />
					<div className='flex mt-3 gap-3 min-h-full'>
						<UserArticles articles={userData.homeSelectList} />
						<OtherData info={userData.userHome} />
					</div>
				</MiddleView>
			) : (
				<Loading />
			)}
		</>
	);
}
