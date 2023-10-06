import React, { useLayoutEffect, useRef, useState } from "react";
import useArticleViewStore from "@/stores/useArticleViewStore";
import useMainPageStore from "@/stores/useMainPageStore";
import remToPx from "@/utils/remToPx";
import style from "./toc.module.scss";

type IProps = {
	value: string;
};

type Item = { level: number; text: string };

export default ({ value }: IProps) => {
	const viewer = useArticleViewStore((state) => state.viewer);
	const main = useMainPageStore((state) => state.main);

	const [items, setItems] = useState<Item[]>([]);
	const [minLevel, setMinLevel] = useState<number>(6);
	const [currentHeadingIndex, setCurrentHeadingIndex] = useState<number>(0);
	const TocUlRef = useRef<HTMLUListElement>(null);
	/** 防抖 */
	const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
	/** 节流 */
	const throttleTimeoutRef = useRef<number | null>(null);
	/** 单向节流标记 */
	const isThrottlingRef = useRef<boolean>(true);
	/** 激活标题距离视窗顶部距离 */
	const topMargin = remToPx(5);
	/** 激活标题距离视窗的区间 */
	const topSpace = remToPx(2);

	useLayoutEffect(() => {
		const root = viewer?.querySelector(".markdown-body") as HTMLElement;
		if (!viewer) return;
		/**
		 * init table of content
		 * refer to bytemd/packages/bytemd/src/toc.svelte
		 **/
		const _items: Item[] = [];
		let _minLevel = minLevel;
		// root.children is HTMLCollection
		Array.prototype.filter
			.call(root.children, (v) => v && v.nodeType === 1)
			.forEach((node: HTMLElement, index) => {
				if (
					node.tagName[0].toLowerCase() === "h" &&
					node.hasChildNodes()
				) {
					const i = Number(node.tagName[1]); // h1 h2 h3 h4 h5 h6
					_minLevel = Math.min(_minLevel, i);
					_items.push({
						level: i,
						text: node.innerText, // stringifyHeading(node),
					});
				}
			});
		setMinLevel(_minLevel);
		setItems(_items);
	}, [value, viewer]);

	useLayoutEffect(() => {
		if (!main || !viewer) return;

		const handleScroll = () => {
			// 节流
			if (isThrottlingRef.current) {
				if (throttleTimeoutRef.current) return;
				throttleTimeoutRef.current = window.setTimeout(() => {
					throttleTimeoutRef.current = null;
				}, 200);
			}
			const root = viewer.querySelector(".markdown-body") as HTMLElement;
			const headings = root.querySelectorAll("h1,h2,h3,h4,h5,h6");

			for (let i = 0; i < headings.length; i++) {
				const element = headings[i];
				const rect = element.getBoundingClientRect();
				if (
					rect.top <= topMargin + topSpace &&
					rect.top >= topMargin - topSpace
				) {
					// setActiveIndex(i);
					setCurrentHeadingIndex(i);
					break;
				} else if (rect.top > topMargin) {
					setCurrentHeadingIndex(i - 1 > 0 ? i - 1 : 0);
					break;
				}
				if (rect.top < 0 && i === headings.length - 1) {
					setCurrentHeadingIndex(i);
				}
			}
		};
		main.addEventListener("scroll", handleScroll);
		return () => {
			main.removeEventListener("scroll", handleScroll);
		};
	}, [value, main, viewer]);

	// 滚动到当前激活标题
	useLayoutEffect(() => {
		if (debounceTimeoutRef.current) {
			clearTimeout(debounceTimeoutRef.current);
		}
		debounceTimeoutRef.current = setTimeout(() => {
			if (!TocUlRef.current) return;
			const ul = TocUlRef.current;
			const list = ul.querySelectorAll("li");
			const currentHeading = list[currentHeadingIndex];
			ul.scrollTo({
				top:
					currentHeading.getBoundingClientRect().top -
					ul.getBoundingClientRect().top +
					ul.scrollTop -
					2 * topMargin,
				// behavior: "smooth",
			});
		}, 200);
	}, [currentHeadingIndex]);

	const skipContent = (index: number) => {
		const root = viewer?.querySelector(".markdown-body") as HTMLElement;
		if (!viewer || !main) return;
		const headings = root.querySelectorAll("h1,h2,h3,h4,h5,h6");
		const elementPosition = headings[index].getBoundingClientRect().top;
		const offsetPosition =
			elementPosition + main.scrollTop - topMargin - topSpace / 2;
		// 单向节流，保证跳转时的灵敏度
		isThrottlingRef.current = false;
		setTimeout(() => {
			isThrottlingRef.current = true;
		}, 500);
		//  使用main元素进行定位
		main.scrollTo({
			top: offsetPosition,
			behavior: "smooth",
		});
	};

	return (
		// container
		<div className='w-full max-h-96'>
			{items.length > 0 && (
				// viewToc
				<div>
					{/* toc */}
					<ul
						className={
							"w-full max-h-96 overflow-y-auto scroll-smooth " +
							style.ul
						}
						ref={TocUlRef}
					>
						{items.map((item, index) => (
							<li
								key={String(index)}
								title={item.text}
								className={`${
									itemLevelMapClassName[item.level]
								} 
								${
									currentHeadingIndex === index
										? "active after:content-['🔍'] !text-primary"
										: ""
								} 
								p-1
								overflow-x-hidden 
								cursor-pointer 
								text-ellipsis 
								whitespace-nowrap 
								hover:text-primary 
								hover:after:content-["👈"] 
								text-gray-600 `}
								style={{
									paddingLeft:
										(item.level - minLevel) * 16 + 8,
								}}
								onClick={() => skipContent(index)}
							>
								{item.text}
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

/**
 * 标题级别对应的样式
 */
const itemLevelMapClassName: { [key: number]: string } = {
	1: "font-bold",
	2: "font-semibold",
	3: "font-medium",
	4: "font-normal",
	5: "font-normal",
	6: "font-normal",
};
