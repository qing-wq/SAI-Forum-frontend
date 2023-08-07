import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/zh-cn";
dayjs.locale("zh-cn");
dayjs.extend(relativeTime);

/**
 * 获取目标时间与当前时间的间隔
 * @param time 时间
 * @returns
 */
export default function fromNow(time: string | dayjs.Dayjs) {
	return dayjs(time).fromNow();
}
