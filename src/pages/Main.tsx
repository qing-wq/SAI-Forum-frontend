import React from "react";
import TheHeader from "../components/TheHeader";
import TheFooter from "../components/TheFooter";
import { Outlet } from "react-router-dom";

const Mian = () => {
	return (
		<main className='h-[100vh] overflow-y-auto'>
			<TheHeader />
			<Outlet />
		</main>
	);
};

export default Mian;
