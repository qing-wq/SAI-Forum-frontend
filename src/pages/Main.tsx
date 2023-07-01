import React from "react";
import TheHeader from "../components/TheHeader";
import TheFooter from "../components/TheFooter";
import { Outlet } from "react-router-dom";

const Mian = () => {
	return (
		<>
			<TheHeader />
			<main className=" min-h-screen">
				<Outlet />
			</main>
			<TheFooter />
		</>
	);
};

export default Mian;
