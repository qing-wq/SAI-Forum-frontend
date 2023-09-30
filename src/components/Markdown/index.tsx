import React, { useEffect, useRef, useState } from "react";
import { Editor, Viewer } from "@bytemd/react";
import useMarkdownTheme from "./useMarkdownTheme";
import MarkdownHeader from "./MarkdownHeader";
import plugins from "./plugins";
import zh_Hans from "bytemd/locales/zh_Hans.json";
import "./markdown.base.css";
import { postImage } from "@/apis/articles";
import useArticleEditStore from "@/stores/useArticleEditStore";
import debounce from "@/utils/debounce";
import { getProcessor } from "bytemd";
import { visit } from "unist-util-visit";
import useArticleViewStore from "@/stores/useArticleViewStore";

/** 图片长传返回插入文章格式 */
type ImageUploadRes = { title: string; alt: string; url: string };
/**
 * 图片上传方法
 */
const uploadImages = (images: File[]): Promise<ImageUploadRes[]> => {
	return Promise.all(
		images.map(
			(image) =>
				new Promise<ImageUploadRes>(async (resolve) => {
					const title = image.name;
					const alt = image.name;
					const { imagePath: url } = await postImage(image);
					resolve({ title, alt, url });
				})
		)
	);
};

/** 封装Markdown编辑器 */
export default function MarkdownEditor() {
	// 获取、绑定文章信息
	const articleInfo = useArticleEditStore((state) => state.articleInfo);
	const saveArticleInfo = useArticleEditStore(
		(state) => state.saveArticleInfo
	);
	const [value, setValue] = useState<string>(articleInfo.content);
	useEffect(() => {
		setValue(articleInfo.content);
	}, [articleInfo]);
	/** 文章防抖保存 */
	const saveArticleContent = (value: string) => {
		console.log(value);
		setValue(value);
		debounce(() => saveArticleInfo({ content: value }), 1000);
	};
	const [theme, changeTheme, themeKeys] = useMarkdownTheme();
	return (
		<div
			onKeyDown={(e) => {
				if (e.ctrlKey && e.key === "s") {
					e.preventDefault();
					saveArticleInfo({ content: value });
				}
			}}
			className='h-screen max-h-scr een overflow-hidden markdown-page'
		>
			<MarkdownHeader />
			<Editor
				value={value}
				plugins={plugins}
				onChange={saveArticleContent}
				locale={zh_Hans}
				uploadImages={uploadImages}
			/>
			{/* <Viewer value={value} plugins={plugins} /> */}
		</div>
	);
}

type MarkdownViewerProp = {
	content: string;
};
/**
 * Markdown查看器
 */
export function MarkdownViewer({ content }: MarkdownViewerProp) {
	let tree = getProcessor({
		plugins: [
			...plugins,
			{
				rehype: (p) =>
					p.use(() => (tree: { children: string | any[] }) => {
						console.log(tree, "mytree");
						if (tree && tree.children.length) {
						}
					}),
			},
		],
	}).parse(content);
	// let ntree = tree.children.filter(
	// 	(v) =>
	// 		v.type === ("html" as "element") /** 写的是牛魔？ 类型都能定歪来*/
	// );
	// 	.forEach((node) => {
	// 		if (node.tagName[0] === "h" && !!node.children.length) {
	// 			const i = Number(node.tagName[1]);
	// 			this.minLevel = Math.min(this.minLevel, i);
	// 			items.push({
	// 				level: i,
	// 				text: stringifyHeading(node),
	// 			});
	// 		}
	// 	});
	// console.log(tree);
	const ref = useRef<HTMLDivElement>(null);
	const setViewer = useArticleViewStore((state) => state.setViewer);
	useEffect(() => {
		setViewer(ref.current);
	}, [ref]);
	return (
		<div ref={ref}>
			<Viewer value={content} plugins={plugins} />
		</div>
	);
}
