import React, { useLayoutEffect, useRef } from "react";
import TheHeader from "../components/TheHeader";
import TheFooter from "../components/TheFooter";
import { Outlet } from "react-router-dom";
import useMainPageStore from "@/stores/useMainPageStore";

const Mian = () => {
	const mainRef = useRef<HTMLElement>(null);
	const setMainRef = useMainPageStore((state) => state.setMainRef);
	useLayoutEffect(() => {
		setMainRef(mainRef.current);
		return () => {
			setMainRef(null);
		};
	}, [mainRef]);
	return (
		<main className='h-[100vh] overflow-y-auto' ref={mainRef}>
			<TheHeader />
			<Outlet />
			<TheFooter />
		</main>
	);
};

export default Mian;
