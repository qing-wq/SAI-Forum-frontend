import React, { memo } from "react";
import svgs, { Svgs } from "./svgs";

type SVGProp = {
	name: keyof Svgs;
	className?: string;
	scale?: number;
};

const SVG = ({ name, className = "", scale = 0.7 }: SVGProp) => {
	return (
		<svg
			fill='currentColor'
			viewBox='0 0 24 24'
			xmlns='http://www.w3.org/2000/svg'
			aria-hidden='true'
			transform={`scale(${scale})`}
			className={`"inline h-8 w-8" ${className} text-center align-middle`}
		>
			{svgs[name]}
		</svg>
	);
};

export default memo(SVG);
