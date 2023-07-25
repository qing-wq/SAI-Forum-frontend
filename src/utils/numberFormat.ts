export default function numberFormat(num: number) {
	if (Math.abs(num) < 1000) return num.toString();
	else if (Math.abs(num) < 10000) return Math.floor(num / 1000) + "k+";
	else if (Math.abs(num) < 1000000) return Math.floor(num / 10000) + "w+";
	else return Math.floor(num / 1000000) + "b+";
}
