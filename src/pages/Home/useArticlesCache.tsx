import React, { useState, useEffect } from "react";
import { getHomeData } from "../../apis/articles";
import { Await } from "@/models";

/** 获取首页数据 */
export default function useArticleCache(category: string) {
	const [promise, setPromise] = useState(getData(category));
	useEffect(() => {
		setPromise(getData(category));
		return () => {};
	}, [category]);
	return [promise, setPromise];
}

/** 包裹函数统一封装  */
function getData(category: string) {
	return wrapPromise<DataCache[string]>(category, () =>
		getHomeData(category)
	);
}

/**
 * promise缓存函数
 * @param {string} category 分类
 * @param {promise} promise 请求
 * @returns
 */
function wrapPromise<T = unknown>(category: string, promise: () => Promise<T>) {
	if (dataCache[category]) {
		return {
			read() {
				return dataCache[category];
			},
		};
	}
	let status = 0;
	let result: T | Error;
	const callPromise = promise().then(
		(res) => {
			status = 1;
			result = res;
			dataCache[category] = res as DataCache[string];
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

// TODO: 缓存类型
type DataCache = {
	[categoryName: string]: Await<ReturnType<typeof getHomeData>>;
};
// 分类数量有限，使用数组缓存不同分类的首页数据
const dataCache: DataCache = {};
