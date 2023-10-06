import { UserInfo } from "@/models";
import React from "react";

type OtherDataProp = {
	info: UserInfo["userHome"];
};

export default function OtherData({ info }: OtherDataProp) {
	return (
		<div className='sticky top-20 h-2/3 w-[20%]'>
			<div className=' card bg-base-100 w-full  min-w-[200px]  shadow-xl hover:shadow-2xl transition-all'>
				<div className='stats stats-vertical shadow'>
					<div className='stat'>
						<div className='stat-title'>已发布文章数</div>
						<div className='stat-value'>{info.articleCount}</div>
						{/* <div className='stat-desc'></div> */}
					</div>

					<div className='stat'>
						<div className='stat-title'>文章被阅读数</div>
						<div className='stat-value'>{info.readCount}</div>
						{/* <div className='stat-desc'>↗︎ 400 (22%)</div> */}
					</div>

					<div className='stat'>
						<div className='stat-title'>文章被点赞数</div>
						<div className='stat-value'>{info.praiseCount}</div>
						{/* <div className='stat-desc'>↘︎ 90 (14%)</div> */}
					</div>
					<div className='stat'>
						<div className='stat-title'>文章被收藏数</div>
						<div className='stat-value'>{info.collectionCount}</div>
						{/* <div className='stat-desc'>↘︎ 90 (14%)</div> */}
					</div>
				</div>
			</div>
			{/* <div className="mt-3 card bg-base-100 w-1/5 min-w-[300px]  shadow-xl hover:shadow-2xl transition-all">
				<div className="stats stats-vertical shadow">
					<div className="stat">
						<div className="stat-title">已发布文章数</div>
						<div className="stat-value">31K</div>
						<div className="stat-desc"></div>
					</div>

					<div className="stat">
						<div className="stat-title">文章被阅读数</div>
						<div className="stat-value">4,200</div>
						<div className="stat-desc">↗︎ 400 (22%)</div>
					</div>

					<div className="stat">
						<div className="stat-title">文章被点赞数</div>
						<div className="stat-value">1,200</div>
						<div className="stat-desc">↘︎ 90 (14%)</div>
					</div>
					<div className="stat">
						<div className="stat-title">文章被收藏数</div>
						<div className="stat-value">1,200</div>
						<div className="stat-desc">↘︎ 90 (14%)</div>
					</div>
				</div>
			</div> */}
		</div>
	);
}
