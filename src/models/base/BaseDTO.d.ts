/**
 * DTO的id
 */
type Id = number;

/**
 * DTO创建时间
 */
type CreateTime = string;

/**
 * DTO更新时间
 */
type UpdateTime = string;

/**
 * 基础DTO信息
 */
export default interface BaseDTO {
	id: Id;
	createTime: CreateTime;
	updateTime: UpdateTime;
}
