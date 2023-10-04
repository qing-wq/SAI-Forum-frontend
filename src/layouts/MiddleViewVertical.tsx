import React from "react";

type MiddleViewProp = {
	children: React.ReactNode;
	top?: React.ReactNode;
};

/** 居中展示布局 */
export default function MiddleViewVertical({ children, top }: MiddleViewProp) {
	return (
		<div className='backdrop-blur-xl  w-2/3  min-w-[1200px] max-w-[1200px] m-auto flex flex-col py-5 gap-5'>
			{top}
			<div className=' flex justify-between '>{children}</div>
		</div>
	);
}
