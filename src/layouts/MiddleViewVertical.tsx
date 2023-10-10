import React from "react";

type MiddleViewProp = {
	children: React.ReactNode;
	top?: React.ReactNode;
};

/** 居中展示布局 */
export default function MiddleViewVertical({ children, top }: MiddleViewProp) {
	return (
		<div className='w-2/3 min-h-full  min-w-[1000px] max-w-[1400px] m-auto flex flex-col py-5 gap-5'>
			{top}
			<div className='w-full h-full flex justify-between '>
				{children}
			</div>
		</div>
	);
}
