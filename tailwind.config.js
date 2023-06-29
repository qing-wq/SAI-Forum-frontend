// const articleBg = require("./src/asset/images/article-bg.svg");
module.exports = {
	content: ["./src/**/*.{js,ts,jsx,tsx}"],
	plugins: [require("daisyui")],
	theme: {
		extend: {
			spacing: {
				sm: "8px",
				md: "16px",
				lg: "24px",
				xl: "48px",
				"1/12": "8.333333%",
				"20vw": "20vw",
				"30vw": "30vw",
			},
			minWidth: {
				screen: "100vw",
				bg: "1000px",
			},
			scale: {
				20: ".20",
				40: ".40",
				95: ".95",
			},
			backgroundSize: {
				auto: "auto",
				cover: "cover",
				contain: "contain",
				"v-half": "100%",
				16: "4rem",
			},
			zIndex: {
				bg: "-10",
				header: "10",
			},
			backgroundImage: {
				"login-bg": "url('/src/asset/images/login-bg.svg')",
				"all-bg": "url('/src/asset/images/all-bg.svg')",
				"frontEnd-bg": "url('/src/asset/images/frontEnd-bg.svg')",
				"backEnd-bg": "url('/src/asset/images/backEnd-bg.svg')",
				"AI-bg": "url('/src/asset/images/AI-bg.svg')",
				"bigData-bg": "url('/src/asset/images/bigData-bg.svg')",
				"android-bg": "url('/src/asset/images/android-bg.svg')",
				"tool-bg": "url('/src/asset/images/tool-bg.svg')",
				"life-bg": "url('/src/asset/images/life-bg.svg')",
				"read-bg": "url('/src/asset/images/read-bg.svg')",
				"article-bg": "url('/src/asset/images/article-bg.svg')",
			},
		},
	},
};
