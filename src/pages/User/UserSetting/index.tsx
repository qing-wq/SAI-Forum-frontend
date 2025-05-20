import UserAvatar from "@/components/UserAvatar";
import MiddleView from "@/layouts/MiddleView";
import MiddleViewVertical from "@/layouts/MiddleViewVertical";
import useLoginStore from "@/stores/useLoginStore";
import { UserSettingMenuBlock } from "./UserSettingMenuBlock";
import BackButton from "@/components/BackButton";
import { UsrInfoEditBlock } from "./UsrInfoEditBlock";

/**
 * 用户信息设置页面
 */
const UserSetting = () => {
	const userInfo = useLoginStore((state) => state.userInfo);
	if (!userInfo) return <div>请先登录</div>;
	return (
		<>
			<div className='bg-article-bg blur-sm opacity-10 fixed top-0 left-0 w-screen h-screen bg-no-repeat bg-cover z-bg' />
			<MiddleViewVertical
				top={
					<div className='bg-white shadow-sm rounded-xl p-4 flex items-center justify-between mb-6'>
						<div className="flex items-center gap-2">
							<h1 className='font-bold text-xl text-gray-800'>用户设置</h1>
							<div className="h-4 w-0.5 bg-gray-200 mx-1"></div>
							<span className="text-sm text-gray-500">管理个人信息和偏好</span>
						</div>
						<BackButton />
					</div>
				}
			>
				<div className='flex flex-col md:flex-row gap-6 w-full'>
					<div className='w-full md:w-64 order-2 md:order-1'>
						<UserSettingMenuBlock />
					</div>
					<div className='flex-1 order-1 md:order-2'>
						<UsrInfoEditBlock curUserInfo={userInfo} />
					</div>
				</div>
			</MiddleViewVertical>
		</>
	);
};

export default UserSetting;
