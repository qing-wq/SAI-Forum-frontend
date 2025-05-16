import React, { useLayoutEffect } from "react";

type BannerItem = {
	img: string;
	title: string;
	onClick?: () => void;
};

/**
 * 首页轮播图
 */
export const Banner = ({ banners }: { banners: BannerItem[] }) => {
	const maxBannerNum = banners.length;
	const carouselRef = React.useRef<HTMLDivElement>(null);
	const [currentBanner, setCurrentBanner] = React.useState<number>(0);
	const [isShow, setIsShow] = React.useState<boolean>(true);
	useLayoutEffect(() => {
		if (!isShow) return;
		const timer = setTimeout(() => {
			scrollBanner();
		}, 5000);
		return () => {
			clearTimeout(timer);
		};
	}, [currentBanner, isShow]);

	useLayoutEffect(() => {
		let carousel = carouselRef.current;
		if (!carousel) return;
		const intersection = new IntersectionObserver((entry) => {
			if (entry[0].intersectionRatio > 0) {
				setIsShow(true);
			} else {
				setIsShow(false);
			}
		});
		intersection.observe(carousel);
		return () => {
			if (!carousel) return;
			intersection.unobserve(carousel);
		};
	}, [currentBanner]);

	const scrollBanner = (banner: number = -1) => {
		const list = carouselRef.current;
		if (!list) return;
		const banners = list.querySelectorAll("div");
		if (banners.length <= banner) return;
		let b: number = banner;
		if (b === -1) b = (currentBanner + 1) % maxBannerNum;
		setCurrentBanner(b);
		banners[b].scrollIntoView({
			behavior: "smooth",
			inline: "center",
			block: "nearest",
		});
	};

	return (
		<div className='mycard h-fit max-h-85 mt-2 overflow-hidden p-2'>
			<div ref={carouselRef} className='carousel w-full rounded-2xl relative'>
				{banners.map((banner) => (
					<div
						id='item1'
						className='carousel-item w-full relative group'
						onClick={banner.onClick}
						key={banner.img}
					>
						{/* 图片 */}
						<img
							src={banner.img}
							className='w-full h-auto transition-transform duration-500 group-hover:scale-105'
							alt={banner.title}
							title={banner.title}
						/>
						{/* 渐变遮罩 */}
						{/* <div className='absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgba(0,0,0,0.5)]'></div> */}
						{/* 标题 */}
						<div className='absolute bottom-0 left-0 right-0 p-3 text-gray-200 font-medium text-sm'>
							{banner.title}
						</div>
					</div>
				))}
			</div>
			<div className='absolute bottom-2 flex justify-center self-center py-2 gap-2 w-full'>
				{[...Array(maxBannerNum).keys()].map((item) => (
					<span
						key={item}
						onClick={() => scrollBanner(item)}
						className={`cursor-pointer w-3 h-3 rounded-full mx-1 transition-all duration-300 inline-block border border-gray-300 ${
							currentBanner === item
								? "bg-[#ff1aff] border-[#ff1aff] shadow-md"
								: "bg-gray-300 hover:bg-[#ff1aff] hover:border-[#ff1aff]"
						}`}
					/>
				))}
			</div>
		</div>
	);
};
