import React from "react";
import style from "./SquareBox.module.css";

/**
 * 立方体
 * @typedef {object} Square
 * @property {React.ReactElement?} front
 * @property {React.ReactElement?} right
 * @property {React.ReactElement?} back
 * @property {React.ReactElement?} left
 * @property {React.ReactElement?} top
 * @property {React.ReactElement?} bottom
 */

/**
 * 旋转效果
 * @typedef {object} Rotate
 * @property {("up"|"down"|"right"|"left")} direction
 * @property {number} fromDeg
 * @property {number} deg
 * @property {number} speed
 * @property {("up"|"down"|"right"|"left")} elseDirection
 * @property {number} elseDeg
 */

/**组件参数
 * @typedef {object} Props
 * @property {Square} square
 * @property {string?} edgeLength
 * @property {Rotate} rotate
 */

/**
 * 立方体组件
 * @param {Props} prop
 */

const SquareBox = ({ square, edgeLength = "100px", rotate, active }) => {
	const squareStyle = {
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
			active={active ? "true" : null}
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
