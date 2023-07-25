import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUserInfo } from "../../apis/user";
import MiddleView from "../../layouts/MiddleView";
import UserInfo from "../../components/UserInfo";
import UserArticles from "./UserArticles";
import OtherData from "./OtherData";
import Loading from "../../components/Loading";
import { Await } from "@/models";

export default function User() {
	const { id } = useParams();
	const [userData, setUserData] =
		useState<Await<ReturnType<typeof getUserInfo>>>();
	useEffect(() => {
		//TODO: 对个人主页做特殊处理
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
					<UserInfo info={userData?.userHome} />
					<div className='flex mt-3 gap-3 min-h-full'>
						<UserArticles articles={userData?.homeSelectList} />
						<OtherData info={userData?.userHome} />
					</div>
				</MiddleView>
			) : (
				<Loading />
			)}
		</>
	);
}
