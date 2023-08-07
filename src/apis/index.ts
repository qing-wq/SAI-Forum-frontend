// const baseURL = "https://mock.apifox.cn/m1/2654035-0-default/";
const baseURL = "http://172.22.1.232:8080/"

const OriginFetch = window.fetch;

/**
 * 封装的fetch请求
 * @param {string} path 接口路径
 * @param {object?} props 请求参数
 */
function xFetch<T = unknown>(path: string, props?: RequestInit) {
	return new Promise<T>(async (resolve, reject) => {
		OriginFetch(baseURL + path, {
			method: "GET",
			...props,
		})
			.then((res) => {
				resolve(res.json());
			})
			.catch((err) => {
				reject(new Error(err));
			});
	});
}

export default xFetch;
