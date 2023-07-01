import React, { useState } from "react";
import { Editor, Viewer } from "@bytemd/react";
import plugins from "./plugins";
import zh_Hans from "bytemd/locales/zh_Hans.json";

/**
 * 图片上传方法
 */
const uploadImages = (
	files: File[]
): Promise<{ title: string; alt: string; url: string }[]> => {
	return new Promise((resolve) =>
		setTimeout(
			() =>
				resolve([
					{
						title: "测试图片上传",
						alt: "sss",
						url: "ccc",
					},
				]),
			1000
		)
	);
};

export default function MarkdownEditor() {
	const [value, setValue] = useState("");
	return (
		<>
			<Editor
				value={value}
				plugins={plugins}
				onChange={(v) => {
					setValue(v);
				}}
				locale={zh_Hans}
				uploadImages={uploadImages}
			/>
			<Viewer value={value} plugins={plugins} />
		</>
	);
}
