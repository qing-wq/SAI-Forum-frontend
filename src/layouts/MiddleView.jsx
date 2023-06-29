import React, { Component } from "react";

/**
 * 居中展示布局
 * @param {React.ReactElement} children 包裹的子组件
 * @returns
 */
export default function MiddleView({ children }) {
	return (
		<div className=" backdrop-blur-xl bg-base-100 bg-opacity-70 w-3/5 m-auto flex flex-col">
			{children}
		</div>
	);
}
