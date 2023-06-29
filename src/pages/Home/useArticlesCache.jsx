import React, { useState, useEffect } from "react";
import { getArticlesByCategory } from "../../apis/articles";

/**
 * 获取首页数据
 * @param {string} category 分类
 * @returns
 */
export default function useArticleCache(category) {
	const [promise, setPromise] = useState(getData(category));
	useEffect(() => {
		setPromise(getData(category));
		return () => {};
	}, [category]);
	return [promise, setPromise];
}

/**
 * 包裹函数统一封装
 * @param {string} category 分类
 * @returns
 */
function getData(category) {
	return wrapPromise(category, () => getArticlesByCategory(category));
}

/**
 * promise缓存函数
 * @param {string} category 分类
 * @param {promise} promise 请求
 * @returns
 */
function wrapPromise(category, promise) {
	if (dataCache[category]) {
		return {
			read() {
				return dataCache[category];
			},
		};
	}
	let status = 0;
	let result;
	const callPromise = promise().then(
		(res) => {
			status = 1;
			result = res;
			dataCache[category] = res;
		},
		(err) => {
			status = -1;
			result = err;
		}
	);
	return {
		read() {
			switch (status) {
				case 0:
					throw callPromise;
				case 1:
					return result;
				case -1:
					throw result;
			}
		},
	};
}

// 分类数量有限，使用数组缓存不同分类的首页数据
const dataCache = {};
