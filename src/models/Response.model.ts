/**
 * 请求码
 */
type Code = number;

/**
 * 请求信息
 */
type Msg = string;

/**
 * 请求状态
 */
type Status = {
	code: Code;
	msg: Msg;
};

/**
 * 请求返回值
 */
interface ResVo<T> {
	status: Status;
	result: T;
}
