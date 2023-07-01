import React, { memo } from "react";
import style from "./Loading.module.css";

const Loading = memo(() => {
	return <div className={style.loading} />;
});

export default Loading;
