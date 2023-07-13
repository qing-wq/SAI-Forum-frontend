import { Navigate } from "react-router-dom";

import Main from "@/pages/Main";
import Login from "@/pages/Login";
import ArticleList from "@/pages/Home";
import Article from "@/pages/Article";
import User from "@/pages/User";
import EditArticle from "@/pages/EditArticle";

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
				path: "user/:id",
				element: <User />,
			},
			{
				path: "",
				element: <Navigate to='home/?category=全部' />,
			},
		],
	},
	{
		path: "edit-article/:id",
		element: <EditArticle />,
	},
	{
		path: "/login",
		element: <Login />,
	},
	{
		path: "*",
		element: <Navigate to='/' />,
	},
];
