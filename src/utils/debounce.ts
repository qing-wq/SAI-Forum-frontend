let timer: NodeJS.Timeout;

/** 无参函数防抖 */
function debounce(
	/** 防抖函数（无参） */
	func: Function,
	/** 防抖时间(ms) */
	delay: number = 1000
) {
	if (timer) {
		clearTimeout(timer);
	}
	timer = setTimeout(() => {
		func();
	}, delay);
}

export default debounce;
