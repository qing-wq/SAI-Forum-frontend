import { useState } from "react";

import { useRoutes } from "react-router-dom";
import routes from "./router";

import useGlobalInit from "./stores/useGlobalInit";
import "./App.css";

import AlertMessage from "./components/AlertMessage";

function App() {
	const router = useRoutes(routes);
	useGlobalInit();
	return (
		<>
			<AlertMessage message='sdsd' />
			{router}
		</>
	);
}

export default App;
