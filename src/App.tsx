import { useState } from "react";

import { useRoutes } from "react-router-dom";
import routes from "./router";

import useGlobalInit from "./stores/useGlobalInit";
import "./App.css";

function App() {
	const router = useRoutes(routes);
	useGlobalInit();
	return <>{router}</>;
}

export default App;
