import React from "react";
import { Link } from "react-router-dom";
import useLoginStore from "@/stores/useLoginStore";
import useNoticeStore from "@/stores/useNoticeStore";

/** 页头用户信息 */
export function HeaderUserInfo() {
	const userInfo = useLoginStore((state) => state.userInfo);
	const logout = useLoginStore((state) => state.logout);
	const newNoticeCount = useNoticeStore((state) => state.newNoticeCount);
	if (!userInfo) {
		return (
			<div className='dropdown dropdown-end'>
				<label tabIndex={0} className='btn btn-ghost btn-circle avatar'>
					游客
				</label>
				<ul
					tabIndex={0}
					className='mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-32'
				>
					<li>
						<Link to={"/login/register"}>注册</Link>
					</li>
					<li>
						<Link to={"/login"}>登录</Link>
					</li>
				</ul>
			</div>
		);
	}
	return (
		<div className='dropdown dropdown-end'>
			<label
				tabIndex={0}
				className='btn btn-ghost btn-circle avatar indicator w-12'
			>
				{newNoticeCount ? (
					<span className='indicator-item badge badge-secondary badge-sm top-2 right-2' />
				) : null}
				<div className='w-10 rounded-full'>
					<img src={userInfo.photo} />
				</div>
			</label>
			<ul
				tabIndex={0}
				className='mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-40 gap-2'
			>
				{/* <li>
        <a className="justify-between">
            配置
            <span className="badge">New</span>
        </a>
    </li> */}
				<li>
					<Link to={"/user/self"}>我的主页</Link>
				</li>
				<li>
					<Link to={"/user/setting"}>账号设置</Link>
				</li>
				<li>
					<Link to={"/message"}>
						消息通知
						{newNoticeCount ? (
							<span className='badge badge-secondary'>
								{newNoticeCount}
							</span>
						) : null}
					</Link>
				</li>
				<li onClick={logout}>
					<a>账号登出</a>
				</li>
			</ul>
		</div>
	);
}
