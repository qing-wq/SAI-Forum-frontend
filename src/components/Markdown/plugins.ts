import breaks from "@bytemd/plugin-breaks";
import frontmatter from "@bytemd/plugin-frontmatter";
import gemoji from "@bytemd/plugin-gemoji";
import gfm from "@bytemd/plugin-gfm";
import gfm_zh_Hans from "@bytemd/plugin-gfm/locales/zh_Hans.json";
import highlight from "@bytemd/plugin-highlight-ssr";
import "highlight.js/styles/default.css";
import math from "@bytemd/plugin-math-ssr";
import math_zh_Hans from "@bytemd/plugin-math/locales/zh_Hans.json";
import "katex/dist/katex.css";
import mediumZoom from "@bytemd/plugin-medium-zoom";
import mermaid from "@bytemd/plugin-mermaid";
import mermaid_zh_Hans from "@bytemd/plugin-mermaid/locales/zh_Hans.json";
import "bytemd/dist/index.css";
/**
 * Markdown编辑器插件
 */
const plugins = [
	breaks(),
	frontmatter(),
	gemoji(),
	gfm({ locale: gfm_zh_Hans }),
	highlight(),
	math({ locale: math_zh_Hans }),
	mediumZoom(),
	mermaid({ locale: mermaid_zh_Hans }),
];

export default plugins;
