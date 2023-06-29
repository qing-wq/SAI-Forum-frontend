import type BaseDTO from "@/models/base/BaseDTO";
/**
 * 用户Id
 */
type UserId = number;

/**
 * 用户名
 */
type UserName = string;

/**
 * 用户角色
 */
type Role = string;

/**
 * 用户头像
 */
type Photo = string;

/**
 * 用户简介
 */
type Profile = string;

/**
 * 职位
 */
type Position = string;

/**
 * 扩展字段
 */
type Extend = string;

/**
 * 是否删除
 */
type Deleted = number;

/**
 * 最后登陆区域
 */
type Region = string;

/**
 * 公司
 */
type Company = string;

export default interface BaseUserInfoDTO extends BaseDTO {
	userId: UserId;
	userName: UserName;
	role: Role;
	photo: Photo;
	position: Position;
	company: Company;
	extend: Extend;
	deleted: Deleted;
	region: Region;
}
