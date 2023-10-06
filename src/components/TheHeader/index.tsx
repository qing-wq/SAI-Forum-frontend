import React, { useState, memo } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import "./TheHeader.css";
import useLoginStore from "@/stores/useLoginStore";
import { log } from "console";
import useAuthTo from "@/auth/useAuthTo";

/**
 * 页头组件
 */
export default memo(function TheHeader() {
	const [searchInput, setSearchInput] = useState<string>();
	const [search, setSearch] = useSearchParams();
	const authTo = useAuthTo();

	// 获取分类激活当前分类的导航选项
	const category = search.get("category");
	const inputSearch = ({
		currentTarget,
	}: React.FormEvent<HTMLInputElement>) => {
		setSearchInput(currentTarget.value);
	};
	return (
		// TODO: 下滑收缩页头
		<header className='navbar gap-0 2xl:gap-6 bg-base-100 sticky top-0 shadow-md z-10'>
			{/* title */}
			<div className='flex-none'>
				<a className='btn btn-ghost normal-case text-3xl' href='/'>
					SAI论坛
				</a>
			</div>
			{/* navigate */}
			<div className=' flex-auto gap-0 2xl:gap-3'>
				{navList.map((nav) => (
					<Link
						key={nav}
						className={
							"header-nav rounded-md text-xl p-2 2xl:pl-4 2xl:pr-4 font-bold whitespace-nowrap" +
							`${category === nav ? " active" : ""}`
						}
						to={`/home/?category=${nav}`}
					>
						{nav}
					</Link>
				))}
			</div>
			<div className='flex-none gap-2'>
				{/* write */}
				<div className='btn-group'>
					<button
						className='btn btn-primary text-base font-black'
						onClick={() => {
							authTo("./edit-article/new", false, true);
						}}
					>
						写文章
					</button>
					<button
						className='btn btn-outline text-base font-black'
						onClick={() => {
							authTo("./draft", false, true);
						}}
					>
						草稿
					</button>
				</div>
				{/* search */}
				<div className='form-control'>
					<input
						type='text'
						placeholder='搜索'
						className='input input-bordered input-disabled'
						onChange={inputSearch}
					/>
				</div>
				{/* user */}
				<UserInfo />
			</div>
		</header>
	);
});

const navList = [
	"全部",
	"人工智能",
	"大数据",
	"前端",
	"后端",
	"Android",
	"开发工具",
	"代码人生",
	"阅读",
];

/** 页头用户信息 */
function UserInfo() {
	const userInfo = useLoginStore((state) => state.userInfo);
	const logout = useLoginStore((state) => state.logout);
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
			<label tabIndex={0} className='btn btn-ghost btn-circle avatar'>
				<div className='w-10 rounded-full'>
					<img src={userInfo.photo} />
				</div>
			</label>
			<ul
				tabIndex={0}
				className='mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-40'
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
				<li onClick={logout}>
					<a>账号登出</a>
				</li>
			</ul>
		</div>
	);
}
