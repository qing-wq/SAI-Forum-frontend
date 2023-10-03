import UserAvatar from "@/components/UserAvatar";
import MiddleView from "@/layouts/MiddleView";
import useLoginStore from "@/stores/useLoginStore";

/**
 * 用户信息设置页面
 */
const UserSetting = () => {
	const userInfo = useLoginStore((state) => state.userInfo);
	if (!userInfo) return <div>请先登录</div>;
	return (
		<MiddleView>
			<div className='w-[800px] m-auto pt-8'>
				<h1 className='font-black text-3xl'>用户设置</h1>
				<p className='divider' />
				<h2 className='font-bold text-2xl'>头像</h2>
				<AvatarEdit photo={userInfo.photo} />
			</div>
		</MiddleView>
	);
};

/**
 * 头像编辑组件
 */
const AvatarEdit = ({ photo }: { photo: string }) => {
	return (
		<div className='avatar group'>
			<div className='w-24 rounded absolute leading-[6rem] text-center text-white cursor-pointer group-hover:block first:hidden bg-slate-600 bg-opacity-50'>
				编辑🖋
			</div>
			<div className='w-24 rounded'>
				<img src={photo} />
			</div>
		</div>
	);
};

export default UserSetting;
