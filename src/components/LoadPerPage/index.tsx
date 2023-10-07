import { useLayoutEffect, useRef } from "react";

type LoadPerPageProps = {
	children: React.ReactNode;
	ended: boolean;
	loadFunc: () => void | Promise<void>;
	successShow: React.ReactNode;
};

/**
 * 分页加载组件
 */
const LoadPerPage = ({
	children,
	ended,
	loadFunc,
	successShow,
}: LoadPerPageProps) => {
	const loadingRef = useRef<HTMLDivElement>(null);
	const intersectionOfLoading = new IntersectionObserver(async (entries) => {
		if (entries[0].isIntersecting) {
			if (ended) return;
			try {
				await loadFunc();
			} catch (e) {
				const err = new Error(
					"Loading error in loading component:" + e
				);
				console.log(err);
			}
		}
	});
	useLayoutEffect(() => {
		// 如果已经加载完成，就不再监听
		if (ended || !loadingRef.current) return;
		intersectionOfLoading.observe(loadingRef.current);
		return () => {
			if (!loadingRef.current) return;
			intersectionOfLoading.unobserve(loadingRef.current);
		};
	}, [loadingRef.current, ended]);
	// 加载完成
	if (ended) return successShow;
	return <div ref={loadingRef}>{children}</div>;
};

export default LoadPerPage;
