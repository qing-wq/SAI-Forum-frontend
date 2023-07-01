import React, { memo } from "react";
import style from "./MoreLoading.module.css";

const MoreLoading = memo(() => {
	return (
		<div className={style.loading}>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	);
});

export default MoreLoading;
