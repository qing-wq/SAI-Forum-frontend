const path = require("path");
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: { hmr: true },
	resolve: {
		// 配置路径别名
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
});
