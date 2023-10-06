const path = require("path");
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		hmr: true,
		proxy: {
			"/proxy": {
				target: "http://10.60.102.53:8080",
				// target: "https://mock.apifox.cn/m1/2654035-0-default",
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/proxy/, ""),
			},
			"/images": {
				target: "http://10.60.102.53:8080",
				// target: "https://mock.apifox.cn/m1/2654035-0-default",
				changeOrigin: true,
				// rewrite: (path) => path.replace(/^\/proxy/, ""),
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
