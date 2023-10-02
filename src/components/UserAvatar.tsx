import { useNavigate } from "react-router-dom";

type UserAvatarProp = {
	src: string;
	size?: "small" | "mid" | "large";
	clickId?: number;
};
const sizeClass = {
	small: "w-6 h-6",
	mid: "w-8 h-8",
	large: "w-16 h-16",
};
/**
 * 用户头像
 */
export default function UserAvatar({
	src,
	size = "small",
	clickId,
}: UserAvatarProp) {
	const navigate = useNavigate();
	return (
		<div
			className={`avatar rounded-full p-[.1rem] btn-ghost ${
				clickId ? "cursor-pointer" : ""
			}`}
			onClick={
				clickId
					? () => {
							navigate(`/user/${clickId}`);
					  }
					: () => {}
			}
		>
			<div className={`${sizeClass[size]} inline-block rounded-full`}>
				<img src={src} alt='头像' />
			</div>
		</div>
	);
}
