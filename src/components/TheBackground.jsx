import React from "react";

/**
 * TheBackground 参数
 * @typedef {object} Props
 * @property {string} bgName 背景名字
 */

/**
 *  背景组件
 * @param {Props} prop
 * @returns
 */
export default function TheBackground({ bgName }) {
	const bg = `bg-${bgName}-bg`;
	return (
		<div
			className={`${bg} bg-cover bg-no-repeat bg-fixed fixed top-0 left-0 origin-left scale-x-20 md:scale-x-40 2xl:scale-x-95 z-bg min-w-bg md:min-w-screen min-h-screen `}
		/>
	);
}
