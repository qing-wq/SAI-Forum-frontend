import React from "react";
import style from "./SquareBox.module.css";

/** 立方体 */
type Square = {
	front?: React.ReactElement;
	right?: React.ReactElement;
	back?: React.ReactElement;
	left?: React.ReactElement;
	top?: React.ReactElement;
	bottom?: React.ReactElement;
};

/** 旋转效果 */
type Rotate = {
	direction: "up" | "down" | "right" | "left";
	fromDeg: number;
	deg: number;
	speed: number;
	elseDirection: "up" | "down" | "right" | "left";
	elseDeg: number;
};

/** 立方体效果参数 */
type Props = {
	square: Square;
	edgeLength?: string;
	rotate: Rotate;
	active?: boolean;
};

/**
 * 立方体组件
 */
const SquareBox = ({ square, edgeLength = "100px", rotate, active }: Props) => {
	const squareStyle: {
		[key: string]: string | number;
	} = {
		"--edge-length": edgeLength,
		"--speed": rotate.speed,
	};
	let direction = "";
	switch (rotate?.direction) {
		case "up":
			squareStyle["--rotateX-deg"] = `${-1 * rotate.deg}deg`;
			squareStyle["--fromX-deg"] = `${-1 * rotate.fromDeg}deg`;
			direction = "v-square";
			break;
		case "down":
			squareStyle["--rotateX-deg"] = `${rotate.deg}deg`;
			squareStyle["--fromX-deg"] = `${rotate.fromDeg}deg`;
			direction = "v-square";
			break;
		case "right":
			squareStyle["--rotateY-deg"] = `${-1 * rotate.deg}deg`;
			squareStyle["--fromY-deg"] = `${-1 * rotate.fromDeg}deg`;
			direction = "l-square";
			break;
		case "left":
			squareStyle["--rotateY-deg"] = `${rotate.deg}deg`;
			squareStyle["--fromY-deg"] = `${rotate.fromDeg}deg`;
			direction = "l-square";
			break;
	}
	switch (rotate?.elseDirection) {
		case "up":
			squareStyle["--rotateX-deg"] = `${-1 * rotate.elseDeg}deg`;
			break;
		case "down":
			squareStyle["--rotateX-deg"] = `${rotate.elseDeg}deg`;
			break;
		case "right":
			squareStyle["--rotateY-deg"] = `${-1 * rotate.elseDeg}deg`;
			break;
		case "left":
			squareStyle["--rotateY-deg"] = `${rotate.elseDeg}deg`;
			break;
	}
	return (
		<div
			className={style.square + " " + style[direction]}
			style={squareStyle}
			data-active={active ? "true" : null}
		>
			<div className={style.front}>
				{square?.front || <div className={style.box} />}
			</div>
			<div className={style.left}>
				{square?.left || <div className={style.box} />}
			</div>
			<div className={style.back}>
				{square?.back || <div className={style.box} />}
			</div>
			<div className={style.right}>
				{square?.right || <div className={style.box} />}
			</div>
			<div className={style.top}>
				{square?.top || <div className={style.box} />}
			</div>
			<div className={style.bottom}>
				{square?.bottom || <div className={style.box} />}
			</div>
		</div>
	);
};

export default SquareBox;
