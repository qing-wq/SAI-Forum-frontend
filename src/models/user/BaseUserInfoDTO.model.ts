import type BaseDTO from "@/models/base/BaseDTO";

type UserId = number;
type UserName = string;
type Role = string;
type Photo = string;
type Profile = string;
type Position = string;
type Company = string;
type Extend = string;
type Deleted = number;
type Region = string;

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
	/**职位*/
	position: Position;
	/**公司*/
	company: Company;
	/**扩展字段*/
	extend: Extend;
	/**是否删除*/
	deleted: Deleted;
	/**最后登陆区域*/
	region: Region;
}
