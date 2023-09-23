import { useState } from "react";

import { useRoutes } from "react-router-dom";
import routes from "./router";

import useGlobalStoreInit from "./stores/useGlobalStoreInit";
import "./App.css";

function App() {
	const router = useRoutes(routes);
	useGlobalStoreInit();
	return <>{router}</>;
}

export default App;
