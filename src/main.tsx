/// <reference types="vite/client" />
import ReactDOM from "react-dom/client";
// import router
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";

const container = document.getElementById("root");

// Create a root.
const root = ReactDOM.createRoot(container!);

// Initial render: Render an element to the root.
root.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>
);
