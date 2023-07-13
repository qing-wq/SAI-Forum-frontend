import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUserInfo } from "../../apis/user";
import MiddleView from "../../layouts/MiddleView";
import UserInfo from "./UserInfo";
import UserArticles from "./UserArticles";
import OtherData from "./OtherData";
import Loading from "../../components/Loading";
import { Await } from "@/models";

export default function User() {
	const { id } = useParams();
	const [userData, setUserData] =
		useState<Await<ReturnType<typeof getUserInfo>>>();
	useEffect(() => {
		getUserInfo(id!).then((res) => {
			setUserData(res);
		});
		154866;
		return () => {};
	}, [id]);

	return (
		<>
			{userData ? (
				<MiddleView>
					<UserInfo info={userData?.userHome} />
					<div className='flex mt-3 gap-3 min-h-full'>
						<UserArticles
							articles={userData?.homeSelectList.list}
						/>
						<OtherData />
					</div>
				</MiddleView>
			) : (
				<Loading />
			)}
		</>
	);
}
