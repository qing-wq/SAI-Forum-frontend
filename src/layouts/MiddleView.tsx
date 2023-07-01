import React from "react";

type MiddleViewProp = {
	children: React.ReactNode;
};

/** 居中展示布局 */
export default function MiddleView({ children }: MiddleViewProp) {
	return (
		<div className=' backdrop-blur-xl bg-base-100 bg-opacity-70 w-3/5 m-auto flex flex-col'>
			{children}
		</div>
	);
}
