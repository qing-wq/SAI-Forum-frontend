import React, { forwardRef } from "react";
import style from "./MoreLoading.module.css";

const MoreLoading = forwardRef<HTMLDivElement>(function MoreLoading(
	props,
	moreLoading
) {
	return (
		<div className={style.loading} {...props} ref={moreLoading}>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	);
});

export default MoreLoading;
