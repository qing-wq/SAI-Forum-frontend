const path = require("path");
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		hmr: true,
		proxy: {
			"/api": {
				target: "http://172.22.1.232:8080",
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, ""),
			},
		},
	},
	resolve: {
		// 配置路径别名
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
});
