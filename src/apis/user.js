import xFetch from ".";

/**
 * 请求用户数据
 * @param {string} id
 */
export function getUser(id) {
	return new Promise((resolve, reject) => {
		xFetch(`user/${id}?`).then((res) => {
			console.log(res.result);
			resolve(res.result);
		});
	});
}
