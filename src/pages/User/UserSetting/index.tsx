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
					<div className='mycard p-4 first:flex-row justify-between'>
						<h1 className='font-black text-3xl'>用户设置</h1>
						<BackButton />
						{/* <p className='divider my-0' /> */}
					</div>
				}
			>
				<div className='w-[79%]'>
					<UsrInfoEditBlock curUserInfo={userInfo} />
				</div>
				<UserSettingMenuBlock />
			</MiddleViewVertical>
		</>
	);
};

export default UserSetting;
