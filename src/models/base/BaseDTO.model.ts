type Id = number;

type CreateTime = string;

type UpdateTime = string;

/**基础DTO信息*/
export default interface BaseDTO {
	/**DTO的id*/
	id: Id;
	/**DTO创建时间*/
	createTime: CreateTime;
	/**DTO更新时间*/
	updateTime: UpdateTime;
}
