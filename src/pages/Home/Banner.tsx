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
		<div className='mycard h-fit max-h-80 mt-2 overflow-hidden p-2'>
			<div ref={carouselRef} className='carousel w-full rounded-2xl'>
				{banners.map((banner) => (
					<div
						id='item1'
						className='carousel-item w-full'
						onClick={banner.onClick}
						key={banner.img}
					>
						<img
							src={banner.img}
							className='w-full'
							alt={banner.title}
							title={banner.title}
						/>
					</div>
				))}
			</div>
			<div className='absolute bottom-2 flex justify-center self-center  py-2 gap-2 '>
				{[...Array(maxBannerNum).keys()].map((item) => (
					<a
						key={item}
						onClick={() => scrollBanner(item)}
						className={`btn btn-xs btn-circle opacity-30 hover:opacity-90 ${
							currentBanner === item
								? "btn-primary opacity-70 "
								: ""
						}}`}
					>
						{item + 1}
					</a>
				))}
			</div>
		</div>
	);
};
