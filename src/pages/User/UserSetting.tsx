import UserAvatar from "@/components/UserAvatar";
import MiddleView from "@/layouts/MiddleView";
import MiddleViewVertical from "@/layouts/MiddleViewVertical";
import useLoginStore from "@/stores/useLoginStore";

/**
 * 用户信息设置页面
 */
const UserSetting = () => {
	const userInfo = useLoginStore((state) => state.userInfo);
	if (!userInfo) return <div>请先登录</div>;
	return (
		<div>
			<MiddleViewVertical
				top={
					<div>
						<h1 className='font-black text-3xl'>用户设置</h1>
						<p className='divider my-0' />
					</div>
				}
			>
				<div className='w-[79%]'>
					<form className='w-3/5 mycard'>
						<h2 className='font-bold text-2xl'>用户名</h2>
						<input
							type='text'
							placeholder='用户名'
							className='input input-bordered w-full'
						/>
						<h2 className='font-bold text-2xl'>头像</h2>
						<AvatarEdit photo={userInfo.photo} />
						<h2 className='font-bold text-2xl'>个人简介</h2>
						<textarea
							className='textarea textarea-bordered w-full'
							placeholder='个人简介'
						/>
						<div className='btn btn-primary w-full'>保存</div>
					</form>
				</div>
				<div className='w-[20%] mycard'>用户信息</div>
			</MiddleViewVertical>
		</div>
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
