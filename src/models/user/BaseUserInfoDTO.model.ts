import type BaseDTO from "@/models/base/BaseDTO.model";

type UserId = number;
type UserName = string;
type Role = string;
type Photo = string;
type Profile = string;
type StudentId = string;
type College = string;
type Major = string;
type Email = string;
type Extend = string;
// type Deleted = number;
type Region = string;
type Time = string;

export default interface BaseUserInfoDTO extends BaseDTO {
	/**用户Id*/
	userId: UserId;
	/**用户名*/
	userName: UserName;
	/**用户角色*/
	role: Role;
	/**用户头像*/
	photo: Photo;
	/**用户简介*/
	profile: Profile;
	/**学号*/
	studentId: StudentId;
	/**学院*/
	college: College;
	/** 专业 */
	major: Major;
	/** 邮箱 */
	email: Email;
	/**扩展字段*/
	extend: Extend;
	/**是否删除*/
	// deleted: Deleted;
	/**最后登陆区域*/
	region: Region;
	/** 账号创建时间 */
	createTime: Time;
	/** 账号更新时间 */
	updateTime: Time;
}
