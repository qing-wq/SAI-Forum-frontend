/**
 * 用户设置菜单区块
 */
export const UserSettingMenuBlock = () => {
	return (
		<ul className='w-[20%] mycard menu bg-base-100  p-2 '>
			<li className='active rounded-xl'>
				<a>个人信息</a>
			</li>
			<li className='disabled'>
				<a>黑名单</a>
			</li>
			<li className='disabled'>
				<a>修改密码</a>
			</li>
		</ul>
	);
};
