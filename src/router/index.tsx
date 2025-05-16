import { Navigate } from "react-router-dom";

import Main from "@/pages/Main";
import Login from "@/pages/Login";
import ArticleList from "@/pages/Home";
import Article from "@/pages/Article";
import User from "@/pages/User/index";
import EditArticle from "@/pages/EditArticle";
import DraftList from "@/pages/Draft";
import UserSetting from "@/pages/User/UserSetting";
import Message from "@/pages/Message";
import AISearch from "@/pages/AISearch";

export default [
	{
		path: "/",
		element: <Main />,
		children: [
			{
				path: "home",
				element: <ArticleList />,
			},
			{
				path: "article/:id",
				element: <Article />,
			},
			{
				path: "user/",
				children: [
					{
						path: ":id",
						element: <User />,
						children: [
							{
								path: ":tab",
								element: <User />,
							},
						],
					},
					{
						path: "setting",
						element: <UserSetting />,
						children: [
							{
								path: ":tab",
								element: <UserSetting />,
							},
						],
					},
				],
			},
			{
				path: "draft",
				element: <DraftList />,
			},
			{
				path: "/message",
				element: <Message />,
			},
			{
				path: "ai-search",
				element: <AISearch />,
			},
			{
				path: "",
				element: <Navigate to='home/?category=全部' replace />,
			},
		],
	},
	{
		path: "edit-article/:id/:type",
		element: <EditArticle />,
	},
	{
		path: "login",
		element: <Login />,
		children: [
			{
				path: ":tab",
				element: <Login />,
			},
		],
	},
	{
		path: "*",
		element: <Navigate to='/' replace />,
	},
];
