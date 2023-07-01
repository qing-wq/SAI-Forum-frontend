import { useState } from "react";

import { useRoutes } from "react-router-dom";
import routes from "./router";
import "./App.css";

function App() {
	const router = useRoutes(routes);
	return <>{router}</>;
}

export default App;
