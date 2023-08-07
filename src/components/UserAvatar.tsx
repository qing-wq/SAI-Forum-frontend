type UserAvatarProp = {
	src: string;
	size?: "small" | "mid" | "large";
};
const sizeClass = {
	small: "w-6 h-6",
	mid: "w-8 h-8",
	large: "w-16 h-16",
};
/**
 * 用户头像
 */
export default function UserAvatar({ src, size = "small" }: UserAvatarProp) {
	return (
		<div className='avatar'>
			<div className={`${sizeClass[size]} inline-block rounded-full`}>
				<img src={src} alt='头像' />
			</div>
		</div>
	);
}
