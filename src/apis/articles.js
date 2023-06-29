import xFetch from ".";

/**
 * 请求首页文章
 * @param {string} category
 */
export function getArticlesByCategory(category = "全部") {
	return new Promise((resolve, reject) => {
		xFetch(`?category=${category}`).then((res) => {
			console.log(res.result);
			resolve(res.result);
		});
	});
}

/**
 * 请求文章详情
 * @param {string} id
 */
export function getArticle(id) {
	return new Promise((resolve, reject) => {
		xFetch(`detail/${id}`).then((res) => {
			console.log(res.result);
			resolve(res.result);
		});
	});
}
