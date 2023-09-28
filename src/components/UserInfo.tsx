import { postUserFollow } from "@/apis/user";
import { UserInfo as UserInfoType } from "@/models";
import useLoginStore from "@/stores/useLoginStore";
import React, { memo } from "react";
import { useNavigate } from "react-router-dom";
import numberFormat from "../utils/numberFormat";

type UserInfoProp = {
	info: UserInfoType["userHome"];
};

/**
 * 用户基本信息展示组件
 */
const UserInfo = memo(({ info }: UserInfoProp) => {
	const navigate = useNavigate();
	return (
		<div className='card card-side p-4 items-center bg-base-100 shadow-xl hover:shadow-2xl transition-all mt-2'>
			<div className='avatar'>
				<div
					className='w-32 h-32 rounded-xl'
					onClick={() => {
						navigate("/user/" + info.id);
					}}
				>
					<img src={info.photo} />
				</div>
			</div>
			<div className='card-body'>
				<h2 className='card-title'>{info.userName}</h2>
				<p>{info.profile}</p>
				<div className='card-actions justify-end'></div>
			</div>
			{/* relation card */}
			<div className='stats min-w-[500px] shadow overflow-x-hidden'>
				<StatBox title='加入了' data={info.joinDayCount} desc='天' />
				<StatBox title='关注了' data={info.followCount} desc='用户' />
				<StatBox title='被关注' data={info.fansCount} desc='用户' />
				<RelationalFunc followed={info.followed} userId={info.userId} />
			</div>
		</div>
	);
});

type StatBoxProp = {
	title: string;
	data: number;
	desc: string;
};

/** 用户基础数据展示框 */
function StatBox({ title, data, desc }: StatBoxProp) {
	return (
		<div
			className='stat group cursor-pointer'
			onClick={() => {
				openInfo(title);
			}}
		>
			<div className='stat-title group-hover:text-primary-focus'>
				{title}
			</div>
			<div
				className='tooltip tooltip-right tooltip-primary'
				data-tip={data}
			>
				<div className='stat-value text-primary '>
					{numberFormat(data)}
				</div>
			</div>
			<div className='stat-desc group-hover:text-primary-focus'>
				{desc}
			</div>
		</div>
	);
}

type RelationalFuncProp = {
	followed: boolean;
	userId: number;
};

/** 用户关系操作区 */
export function RelationalFunc({ followed, userId }: RelationalFuncProp) {
	const myInfo = useLoginStore((state) => state.userInfo);
	const navigate = useNavigate();
	/** 关注、取关用户 */
	const follow = (followed: boolean) => {
		if (!myInfo) {
			// 未登录处理
			alert("未登录，请先登录");
			return;
		}
		postUserFollow(userId, followed)
			.then(() => {
				// TODO: 关注关系变更后状态更新
				navigate(0);
			})
			.catch((err) => {
				alert("关注失败: " + err.message);
			});
	};
	//对自己主页的处理
	if (myInfo?.id === userId)
		return (
			<div className='flex flex-col justify-center px-4 gap-2 min-w-[100px]'>
				<button
					className='btn btn-sm btn-primary h-3'
					onClick={() => {
						// follow(false);
					}}
				>
					我的设置
				</button>
			</div>
		);
	return (
		<div className='flex flex-col justify-center px-4 gap-2 min-w-[100px]'>
			{followed ? (
				<button
					className='btn btn-sm btn-secondary h-3'
					onClick={() => {
						follow(false);
					}}
				>
					已关注
				</button>
			) : (
				<button
					className='btn btn-sm btn-primary h-3'
					onClick={() => {
						follow(true);
					}}
				>
					关 注
				</button>
			)}
			<button className='btn btn-sm btn-primary btn-disabled'>
				私 聊
			</button>
		</div>
	);
}

function openInfo(key: string) {
	// alert(key);
	// TODO: 查看用户基础信息
}

export default UserInfo;
