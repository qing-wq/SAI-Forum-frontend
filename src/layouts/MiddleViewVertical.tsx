import React from "react";

type MiddleViewProp = {
	children: React.ReactNode;
};

/** 居中展示布局 */
export default function MiddleViewVertical({ children }: MiddleViewProp) {
	return (
		<div
			className='backdrop-blur-xl  w-2/3  min-w-[1200px] max-w-[1200px] m-auto flex justify-between py-[20px]'
			onScroll={(e) => {
				console.log(e);
			}}
		>
			{children}
		</div>
	);
}
