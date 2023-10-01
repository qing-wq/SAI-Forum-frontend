function remToPx(remValue: number): number {
	const rootFontSize = parseFloat(
		getComputedStyle(document.documentElement).fontSize
	);
	const pxValue = remValue * rootFontSize;
	return pxValue;
}
export default remToPx;
