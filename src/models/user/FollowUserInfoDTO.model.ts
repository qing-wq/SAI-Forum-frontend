import UserStatisticInfoDTO from "./UserStatisticInfoDTO.model";

/** 关注用户信息从用户主页信息继承的属性 */
type FollowUserInfoDTOPropertysFromUserStatisticInfoDTO =
	| "followed"
	| "userId"
	| "userName";
type RelationId = number;

/** 关注者用户信息 */
export default interface FollowUserInfoDTO
	extends Pick<
		UserStatisticInfoDTO,
		FollowUserInfoDTOPropertysFromUserStatisticInfoDTO
	> {
	/** 关联Id */
	relationId: RelationId;
	/** 用户头像 */
	avatar: UserStatisticInfoDTO["photo"];
}
