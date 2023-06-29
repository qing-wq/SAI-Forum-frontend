import BaseUserInfoDTO from "./BaseUserInfoDTO.model";
/** 基本用户信息*/
export default interface SimpleUserInfoDTO {
	/** userId */
	userId: BaseUserInfoDTO["userId"];
	/** 用户名 */
	name: BaseUserInfoDTO["userName"];
	/** 用户头像 */
	avatar: BaseUserInfoDTO["photo"];
	/** 用户简介 */
	profile: BaseUserInfoDTO["profile"];
}
