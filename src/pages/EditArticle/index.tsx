import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MarkdownEditor from "@/components/Markdown";
import useArticleEditStore from "@/stores/useArticleEditStore";
/**
 * 文章编辑页面
 */
export default function EditArticle() {
	const { id } = useParams<string>();
	const navigate = useNavigate();
	const getArticleInfo = useArticleEditStore((state) => state.getArticleInfo);
	// 处理param参数，数值化、异常参数处理
	/**
	 * 编辑器文章Id
	 * - -1 - 参数异常
	 * - 0 - 新建文章
	 * - 其他数字 - 文章Id
	 */
	const articleID = useMemo((): number => {
		if (id === "new") return 0;
		let formatedId = Number(id);
		return isNaN(formatedId) ? -1 : formatedId;
	}, [id]);
	//当params参数错误时跳转至新建文章页面
	useEffect(() => {
		if (articleID === -1) {
			navigate("/edit-article/new", { replace: true });
		} else {
			// 获取文章信息
			getArticleInfo(articleID);
		}
	}, [articleID]);

	return (
		<div style={{ height: "100%" }}>
			<MarkdownEditor />
		</div>
	);
}
