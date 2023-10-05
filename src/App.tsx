import { useEffect, useState } from "react";

import { useRoutes } from "react-router-dom";
import routes from "./router";

import useGlobalStoreInit from "./stores/useGlobalStoreInit";
import "./App.css";

function App() {
	const globalInit = useGlobalStoreInit();
	useEffect(() => {
		globalInit();
	}, []);
	const router = useRoutes(routes);
	return <>{router}</>;
}

export default App;
