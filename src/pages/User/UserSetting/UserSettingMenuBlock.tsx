/**
 * 用户设置菜单区块
 */
export const UserSettingMenuBlock = () => {
	return (
		<div className='bg-white shadow-sm rounded-xl overflow-hidden w-full'>
			<div className="px-4 py-3 border-b border-gray-100">
				<h3 className="text-sm font-medium text-gray-700">个人信息设置</h3>
			</div>
			<ul className='w-full'>
				<li className='border-l-4 border-purple-500 bg-purple-50'>
					<a className='flex items-center gap-2 px-4 py-3 text-purple-700 font-medium'>
						<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
						</svg>
						个人信息
					</a>
				</li>
				<li className='border-l-4 border-transparent opacity-60 cursor-not-allowed group relative'>
					<div className='absolute inset-0 z-10'></div>
					<div className='flex items-center gap-2 px-4 py-3 text-gray-400 group-hover:line-through'>
						<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
						</svg>
						黑名单
						<span className="ml-auto text-xs bg-gray-200 text-gray-500 px-2 py-0.5 rounded hidden group-hover:inline">即将上线</span>
					</div>
				</li>
				<li className='border-l-4 border-transparent opacity-60 cursor-not-allowed group relative'>
					<div className='absolute inset-0 z-10'></div>
					<div className='flex items-center gap-2 px-4 py-3 text-gray-400 group-hover:line-through'>
						<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
						</svg>
						修改密码
						<span className="ml-auto text-xs bg-gray-200 text-gray-500 px-2 py-0.5 rounded hidden group-hover:inline">即将上线</span>
					</div>
				</li>
			</ul>
		</div>
	);
};
