import React from "react";

interface CoverProps {
	width?: number;
	height?: number;
	children: React.ReactNode;
}

const TheCover: React.FC<CoverProps> = ({ width, height, children }) => {
	const aspectRatio = 4 / 3;

	let style: React.CSSProperties = {};

	if (width && height) {
		style = {
			width,
			height,
		};
	} else if (width) {
		style = {
			width,
			height: width / aspectRatio,
		};
	} else if (height) {
		style = {
			width: height * aspectRatio,
			height,
		};
	} else {
		style = {
			width: "100%",
			height: "100%",
		};
	}

	const backgroundImageStyle: React.CSSProperties = {
		position: "absolute",
		top: 0,
		left: 0,
		width: "100%",
		height: "100%",
		backgroundRepeat: "no-repeat",
		backgroundSize: "cover",
		backgroundPosition: "center",
	};

	return (
		<div className='relative overflow-hidden' style={style}>
			<div className='absolute inset-0' style={backgroundImageStyle}>
				{children}
			</div>
		</div>
	);
};

export default TheCover;
