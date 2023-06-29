type Code = number;

type Msg = string;

/**请求状态*/
type Status = {
	/**请求码*/
	code: Code;
	/**请求信息*/
	msg: Msg;
};

/**请求返回值*/
interface ResVo<T> {
	status: Status;
	result: T;
}
