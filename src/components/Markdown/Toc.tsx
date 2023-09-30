import React, { useLayoutEffect, useState } from "react";
import useArticleViewStore from "@/stores/useArticleViewStore";

type IProps = {
	value: string;
};

type Item = { level: number; text: string };

export default ({ value }: IProps) => {
	const viewer = useArticleViewStore((state) => state.viewer);
	const [items, setItems] = useState<Item[]>([]);
	const [minLevel, setMinLevel] = useState<number>(6);
	const [currentHeadingIndex, setCurrentHeadingIndex] = useState<number>(0);
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
		const root = viewer?.querySelector(".markdown-body") as HTMLElement;
		if (!viewer) return;
		const headings = root.querySelectorAll("h1,h2,h3,h4,h5,h6");

		const observer = new IntersectionObserver(
			(entries: IntersectionObserverEntry[]) => {
				const io: IntersectionObserverEntry = entries[0];
				if (io.isIntersecting === true) {
					const index = Array.prototype.indexOf.call(
						headings,
						io.target
					);
					setCurrentHeadingIndex((preState) => index);
				}
			},
			{ threshold: [1] }
		);

		// observe all head
		headings.forEach((node) => observer.observe(node));

		return () => {
			headings.forEach((node) => observer.unobserve(node));
		};
	}, [value, viewer]);

	const skipContent = (index: number) => {
		const root = viewer?.querySelector(".markdown-body") as HTMLElement;
		if (!viewer) return;
		const headings = root.querySelectorAll("h1,h2,h3,h4,h5,h6");
		setCurrentHeadingIndex(index);
		// const elementPosition = headings[index].getBoundingClientRect().top;
		// const offsetPosition = elementPosition + window.pageYOffset - 10;
		// TODO: 使用main元素进行定位
		headings[index].scrollIntoView({ behavior: "smooth", block: "center" });
	};

	return (
		// container
		<div className='w-full max-h-96 overflow-y-scroll'>
			{items.length > 0 && (
				// viewToc
				<div>
					{/* FIX */}
					<div>
						{/* TOCBOX */}
						<div className=''>
							{/* toc */}
							<ul className=''>
								{items.map((item, index) => (
									<li
										key={String(index)}
										className={`${
											currentHeadingIndex === index
												? " active"
												: ""
										} cursor-pointer`}
										style={{
											paddingLeft:
												(item.level - minLevel) * 16 +
												8,
										}}
										onClick={() => skipContent(index)}
									>
										{item.text}
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
