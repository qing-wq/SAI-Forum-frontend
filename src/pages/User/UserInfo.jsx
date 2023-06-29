import React, { memo } from "react";

const UserInfo = memo(({ info }) => {
	return (
		<div className="card card-side p-4 items-center bg-base-100 shadow-xl hover:shadow-2xl transition-all mt-2">
			<div className="avatar">
				<div className="w-32 h-32 rounded-xl">
					<img src="https://cdn.tobebetterjavaer.com/paicoding/avatar/0082.png" />
				</div>
			</div>
			<div className="card-body">
				<h2 className="card-title">{info.userName}</h2>
				<p>{info.profile}</p>
				<div className="card-actions justify-end"></div>
			</div>
			{/* relation card */}
			<div className="stats min-w-[450px] shadow">
				<StatBox title="加入了" data={info.joinDayCount} desc="天" />
				<StatBox title="关注了" data={info.followCount} desc="用户" />
				<StatBox title="被关注" data={info.fansCount} desc="用户" />
				<div className="flex flex-col justify-center px-4 gap-2 min-w-[100px]">
					<button className="btn btn-sm btn-primary h-3">
						关 注
					</button>
					<button className="btn btn-sm btn-primary">私 聊</button>
				</div>
			</div>
		</div>
	);
});

function StatBox({ title, data, desc }) {
	return (
		<div
			className="stat group cursor-pointer"
			onClick={() => {
				openInfo(title);
			}}
		>
			<div className="stat-title group-hover:text-primary-focus">
				{title}
			</div>
			<div
				className="tooltip tooltip-right tooltip-primary"
				data-tip={data}
			>
				<div className="stat-value text-primary ">
					{numberFormat(data)}
				</div>
			</div>
			<div className="stat-desc group-hover:text-primary-focus">
				{desc}
			</div>
		</div>
	);
}

function numberFormat(num) {
	if (num < 1000) return num.toString();
	else if (num < 10000) return Math.floor(num / 1000) + "k+";
	else if (num < 1000000) return Math.floor(num / 10000) + "w+";
	else return Math.floor(num / 1000000) + "b+";
}

function openInfo(key) {
	alert(key);
}

export default UserInfo;
