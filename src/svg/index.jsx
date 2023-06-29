import React, { memo } from "react";
import svgs from "./svgs";

const SVG = ({ name, className = "", scale = 0.7 }) => {
	return (
		<svg
			fill="currentColor"
			viewBox="0 0 20 20"
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden="true"
			transform={`scale(${scale})`}
			className={`"inline h-8 w-8" ${className}`}
		>
			{svgs[name]}
		</svg>
	);
};

export default memo(SVG);
