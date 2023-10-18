import { useState, useEffect } from "react";
import ThemeKey from "juejin-markdown-themes";

/** 掘金Markdown主题列表 */
const ThemeKeys: string[] = Object.keys(ThemeKey);
type ThemeKey =
	| "juejin"
	| "github"
	| "smartblue"
	| "cyanosis"
	| "channing-cyan"
	| "fancy"
	| "hydrogen"
	| "condensed-night-purple"
	| "greenwillow"
	| "v-green"
	| "vue-pro"
	| "healer-readable"
	| "mk-cute"
	| "jzman"
	| "geek-black"
	| "awesome-green"
	| "qklhk-chocolate"
	| "orange"
	| "scrolls-light"
	| "simplicity-green"
	| "arknights"
	| "vuepress"
	| "Chinese-red"
	| "nico"
	| "devui-blue";

export const themeNames: ThemeKey[] = [
	"juejin",
	"github",
	"smartblue",
	"cyanosis",
	"channing-cyan",
	"fancy",
	"hydrogen",
	"condensed-night-purple",
	"greenwillow",
	"v-green",
	"vue-pro",
	"healer-readable",
	"mk-cute",
	"jzman",
	"geek-black",
	"awesome-green",
	"qklhk-chocolate",
	"orange",
	"scrolls-light",
	"simplicity-green",
	"arknights",
	"vuepress",
	"Chinese-red",
	"nico",
	"devui-blue",
];
/** Markdown主题Hook */
const useMarkdownTheme = (initialTheme: ThemeKey = "juejin") => {
	/** 当前主题 */
	const [theme, setTheme] = useState<string>(initialTheme);
	/** 修改当前主题 */
	const changeTheme = (themeName: (typeof ThemeKeys)[number] = "juejin") => {
		// 主题不存在时设为默认
		if (!ThemeKeys.includes(themeName)) themeName = "juejin";
		if (theme != themeName) setTheme(themeName);
	};
	// 挂载主题
	useEffect(() => {
		console.log("theme", theme);
		// 根据主题选择对应的 CSS 文件
		const link = document.createElement("link");
		link.href = `/markdownThemes/${theme}.min.css`;
		link.rel = "stylesheet";
		link.type = "text/css";
		document.head.appendChild(link);
		// 组件卸载时移除 CSS 文件
		return () => {
			document.head.removeChild(link);
		};
	}, [theme]);
	return [theme, changeTheme, ThemeKeys];
};

export default useMarkdownTheme;
