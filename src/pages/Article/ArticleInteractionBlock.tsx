import React, { memo, useState } from "react";
import ArticleDTO from "@/models/article/ArticleDTO.model";
import Svg from "@/svg";
import { Svgs } from "@/svg/svgs";
import numberFormat from "@/utils/numberFormat";
import { ArticleInterationOperate, articleInteraction } from "@/apis/articles";
import useLoginStore from "@/stores/useLoginStore";

/**
 * 文章互动区块
 */
export default function ArticleInteractionBlock({
	articleInfo,
}: {
	articleInfo: ArticleDTO;
}) {
	/** 将当前地址复制到剪贴板 */
	const share = () => {
		let value = window.location.href;
		navigator.clipboard.writeText(value).then(
			() => {
				console.log("复制成功");
				// TODO: 弹出提示
			},
			() => {
				console.log("复制失败");
			}
		);
	};
	return (
		<div className='mycard w-full bg-base-100 flex !flex-row gap-[1px] items-center justify-around py-3 px-3'>
			<ArticleInteractionItem
				articleId={articleInfo.articleId}
				actived={articleInfo.praised}
				count={articleInfo.count.praiseCount}
				title='点赞'
				iconName='handThumbUp'
			/>
			<ArticleInteractionItem
				articleId={articleInfo.articleId}
				actived={articleInfo.collected}
				count={articleInfo.count.collectionCount}
				title='收藏'
				iconName='star'
			/>
			<span
				className='cursor-pointer hover:text-primary text-center'
				title='分享'
				onClick={share}
			>
				<Svg name='share' />
				<p>分享</p>
			</span>
		</div>
	);
}

/**
 * 文章互动单元
 */
const ArticleInteractionItem = memo(function ArticleInteractionItem({
	articleId,
	actived,
	count,
	title,
	iconName,
}: {
	articleId: number;
	actived: boolean;
	count: number;
	title: "点赞" | "收藏";
	iconName: keyof Svgs;
}) {
	// 是否激活
	const [isActived, setIsActived] = useState(actived);
	// 请求节流标记
	const [requestThrottle, setRequestThrottle] = useState(false);
	// 用户登陆信息
	const userInfo = useLoginStore((state) => state.userInfo);
	const InterationOperateMap = () => {
		if (!isActived) return ArticleInterationOperate[title];
		else
			return title == "点赞"
				? ArticleInterationOperate["取消点赞"]
				: ArticleInterationOperate["取消收藏"];
	};
	/** 互动事件处理(通过对互动事件异步请求结果的控制，控制展示) */
	const handleInteraction = () => {
		// 未登录提示
		if (!userInfo) {
			alert("请先登录");
			return;
		}
		if (requestThrottle) return;
		setIsActived(!isActived);
		setRequestThrottle(true);
		articleInteraction(articleId, InterationOperateMap())
			.then(() => {
				// TODO: 弹出提示
			})
			.catch(() => {
				// TODO: 弹出提示
				setIsActived(isActived);
			})
			.finally(() => {
				setRequestThrottle(false);
			});
	};
	return (
		<span
			className={`${
				requestThrottle ? " cursor-wait" : ""
			} cursor-pointer hover:text-primary text-center ${
				isActived ? "text-primary" : ""
			} }`}
			title={title}
			onClick={handleInteraction}
		>
			<Svg name={iconName} />
			<p>
				{numberFormat(
					actived
						? isActived
							? count
							: count - 1
						: isActived
						? count + 1
						: count
				)}
			</p>
		</span>
	);
});
