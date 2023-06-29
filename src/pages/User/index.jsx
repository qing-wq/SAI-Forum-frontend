import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUser } from "../../apis/user";
import MiddleView from "../../layouts/MiddleView";
import UserInfo from "./UserInfo";
import UserArticles from "./UserArticles";
import OtherData from "./OtherData";
import Loading from "../../components/Loading";

export default function User() {
	const { id } = useParams();
	const [userData, setUserData] = useState(null);
	useEffect(() => {
		getUser(id).then((res) => {
			setUserData(res);
		});
		return () => {};
	}, [id]);

	return (
		<>
			{userData ? (
				<MiddleView>
					<UserInfo info={userData?.userHome} />
					<div className="flex mt-3 gap-3 min-h-full">
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
