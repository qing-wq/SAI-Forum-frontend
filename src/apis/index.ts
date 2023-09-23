// const baseURL = "https://mock.apifox.cn/m1/2654035-0-default/";
// const baseURL = "http://172.22.1.232:8080/"
// const baseURL = "http://172.22.136.251:5173/api/";

import ResVo from "@/models/Response/Response.model";

const getBaseURL = () => window.location.origin + "/api/";
const OriginFetch = window.fetch;

/**
 * 封装的fetch请求
 * @param {string} path 接口路径
 * @param {object?} props 请求参数
 */
function xFetch<T = unknown>(path: string, props?: RequestInit) {
	return new Promise<T>(async (resolve, reject) => {
		OriginFetch(getBaseURL() + path, {
			method: "GET",
			...props,
		})
			.then(async (res) => {
				const result: ResVo<T> = await res.json();
				// 拦截器
				if (result.status.code !== 200) {
					reject(new Error(result.status.msg));
				}
				resolve(result.result);
			})
			.catch((err) => {
				console.log("网络错误");
				reject(new Error(err));
			});
	});
}

export default xFetch;
