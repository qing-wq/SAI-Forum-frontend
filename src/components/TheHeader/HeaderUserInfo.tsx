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
					className='mt-3 p-0 shadow-lg menu menu-compact dropdown-content bg-base-100 rounded-lg w-40 overflow-hidden'
				>
					<li className="hover:bg-purple-50 transition-colors group" onClick={() => document.activeElement instanceof HTMLElement && document.activeElement.blur()}>
						<Link to={"/login/register"} className="py-2.5 px-4 text-gray-700 hover:text-purple-700 transition-colors flex items-center">
							<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 group-hover:text-purple-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
							</svg>
							<span>注册</span>
						</Link>
					</li>
					<li className="hover:bg-purple-50 transition-colors group" onClick={() => document.activeElement instanceof HTMLElement && document.activeElement.blur()}>
						<Link to={"/login"} className="py-2.5 px-4 text-gray-700 hover:text-purple-700 transition-colors flex items-center">
							<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 group-hover:text-purple-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
							</svg>
							<span>登录</span>
						</Link>
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
				className='mt-3 p-0 shadow-lg menu menu-compact dropdown-content bg-base-100 rounded-lg w-36 overflow-hidden'
			>
				<li className="hover:bg-purple-50 transition-colors group" onClick={() => document.activeElement instanceof HTMLElement && document.activeElement.blur()}>
					<Link to={"/user/self"} className="py-2.5 px-4 text-gray-700 hover:text-purple-700 transition-colors flex items-center">
						<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 group-hover:text-purple-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
						</svg>
						<span>我的主页</span>
					</Link>
				</li>
				<li className="hover:bg-purple-50 transition-colors group" onClick={() => document.activeElement instanceof HTMLElement && document.activeElement.blur()}>
					<Link to={"/user/setting"} className="py-2.5 px-4 text-gray-700 hover:text-purple-700 transition-colors flex items-center">
						<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 group-hover:text-purple-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
						</svg>
						<span>账号设置</span>
					</Link>
				</li>
				<li className="hover:bg-purple-50 transition-colors group" onClick={() => document.activeElement instanceof HTMLElement && document.activeElement.blur()}>
					<Link to={"/message"} className="py-2.5 px-4 text-gray-700 hover:text-purple-700 transition-colors flex items-center relative">
						<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 group-hover:text-purple-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
						</svg>
						<span>消息通知</span>
						{newNoticeCount ? (
							<span className='badge badge-sm badge-secondary absolute right-3 top-1/2 -translate-y-1/2'>
								{newNoticeCount}
							</span>
						) : null}
					</Link>
				</li>
				<li className="hover:bg-red-50 transition-colors group" onClick={(e) => {logout(); document.activeElement instanceof HTMLElement && document.activeElement.blur();}}>
					<a className="py-2.5 px-4 text-gray-700 hover:text-red-600 transition-colors border-t border-gray-100 flex items-center">
						<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 group-hover:text-red-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
						</svg>
						<span>账号登出</span>
					</a>
				</li>
			</ul>
		</div>
	);
}
