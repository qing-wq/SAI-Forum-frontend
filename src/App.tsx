import { useEffect, useState } from "react";

import { useRoutes } from "react-router-dom";
import routes from "./router";

import useGlobalStoreInit from "./stores/useGlobalStoreInit";
import "./App.css";
import "./style.scss";

function App() {
	const globalInit = useGlobalStoreInit();
	globalInit();
	const router = useRoutes(routes);
	return <>{router}</>;
}

export default App;
