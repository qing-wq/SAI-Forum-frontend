import BaseUserInfoDTO from "@/models/user/BaseUserInfoDTO.model";
import useLoginStore from "@/stores/useLoginStore";
import { uploadImages } from "@/utils/uploadImages";
import { Reducer, useReducer, useRef } from "react";

type ActionMap<T extends { [key: string]: any }> = {
	[Key in keyof T]: T[Key] extends undefined
		? {
				type: Key;
		  }
		: {
				type: Key;
				payload: T[Key];
		  };
};

type Payload = UserInfo;

type Action = ActionMap<Payload>[keyof ActionMap<Payload>];

type ChangeableInfoInUser = Partial<keyof BaseUserInfoDTO> &
	(
		| "userName"
		| "studentId"
		| "photo"
		| "profile"
		| "college"
		| "major"
		| "email"
	);

type UserInfo = Pick<BaseUserInfoDTO, ChangeableInfoInUser>;

const leftPartOfForm: {
	[key in keyof Omit<UserInfo, "profile" | "photo">]: {
		label: string;
		required: boolean;
	};
} = {
	userName: {
		label: "用户名",
		required: true,
	},
	studentId: {
		label: "学号",
		required: true,
	},
	college: {
		label: "学院",
		required: false,
	},
	major: {
		label: "专业",
		required: false,
	},
	email: {
		label: "邮箱",
		required: false,
	},
};

/**
 * 用户信息表单组件
 */
export const UsrInfoEditBlock = ({
	curUserInfo,
}: {
	curUserInfo: BaseUserInfoDTO;
}) => {
	const updateUserInfo = useLoginStore((state) => state.updateUserInfo);

	/** 初始化用户信息 */
	const initUserInfo = (userInfo: typeof curUserInfo): typeof curUserInfo => {
		return curUserInfo;
	};

	const reducer: Reducer<UserInfo, Action> = (
		state: UserInfo,
		action: Action
	) => {
		switch (action.type) {
			default:
				return { ...state, [action.type]: action.payload };
		}
	};

	const [userInfo, dispatchUserInfo] = useReducer<
		Reducer<UserInfo, Action>,
		BaseUserInfoDTO
	>(reducer, curUserInfo, initUserInfo);

	const changeValue =
		(type: Action["type"]) =>
		(
			e:
				| React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
				| { target: { value: string } }
		) => {
			dispatchUserInfo({
				type,
				payload: e.target.value,
			} as Action);
		};

	const submit = async () => {
		/** 变更的信息 */
		let submitInfo: Partial<UserInfo> = {};
		// 过滤掉未变更的信息
		Object.keys(userInfo).forEach((key) => {
			const infoKey = key as keyof UserInfo;
			if (userInfo[infoKey] != curUserInfo[infoKey]) {
				submitInfo[infoKey] = userInfo[infoKey];
			}
		});
		// 表单校验
		if (submitInfo.userName && !submitInfo.userName) {
			alert("用户名不能为空");
			return;
		}
		if (submitInfo.studentId && !submitInfo.studentId) {
			alert("学号不能为空");
			return;
		}
		let res: boolean;
		// 提交
		try {
			res = await updateUserInfo(submitInfo);
		} catch (e) {
			console.error(e);
			return;
		}
		if (res) alert("修改成功");
		else alert("修改失败");
	};

	return (
		<form className='mycard p-8 bg-white shadow-sm rounded-xl'>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
				<div className='flex flex-col gap-6'>
					{Object.keys(leftPartOfForm).map((key) => {
						const item =
							leftPartOfForm[key as keyof typeof leftPartOfForm];
						return (
							<div key={item["label"]} className="space-y-2">
								<label className='text-gray-700 font-medium text-sm block'>
									{item["label"]}
									{item["required"] ? <span className="text-red-500 ml-1">*</span> : ""}
								</label>
								<input
									type='text'
									placeholder={`请输入${item["label"]}`}
									className='w-full px-4 py-2.5 rounded-md border border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none transition-all duration-200'
									value={
										userInfo[key as keyof typeof leftPartOfForm]
									}
									onChange={changeValue(
										key as keyof typeof leftPartOfForm
									)}
								/>
							</div>
						);
					})}
				</div>
			<div className='flex flex-col gap-6'>
					<div className='space-y-2'>
						<label className='text-gray-700 font-medium text-sm block'>头像</label>
						<AvatarEdit
							photo={userInfo.photo}
							setPhoto={(photo: string) => {
								changeValue("photo")({ target: { value: photo } });
							}}
						/>
					</div>
					<div className='space-y-2'>
						<label className='text-gray-700 font-medium text-sm block'>个人简介</label>
						<textarea
							className='w-full px-4 py-2.5 rounded-md border border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none transition-all duration-200 h-32 resize-none'
							placeholder='简单介绍一下自己...'
							value={userInfo.profile}
							onChange={changeValue("profile")}
							maxLength={100}
						/>
						<div className="text-xs text-gray-400 text-right">{userInfo.profile?.length || 0}/100</div>
					</div>
					<div className="col-span-full mt-4">
						<button 
							className='w-full md:w-auto px-6 py-2.5 bg-purple-500 text-white font-medium rounded-md shadow-sm hover:shadow-md transition-all duration-200 hover:from-purple-700 hover:to-purple-800 focus:ring-2 focus:ring-purple-200' 
							onClick={submit}
						>
							保存修改
						</button>
					</div>
				</div>
			</div>
		</form>
	);
};

/**
 * 头像编辑组件
 */
const AvatarEdit = ({
	photo,
	setPhoto,
}: {
	photo: string;
	setPhoto: Function;
}) => {
	const imgUploadRef = useRef<HTMLInputElement>(null);
	return (
		<div className='avatar group self-center relative'>
			<div
				className='w-32 h-32 rounded-full absolute inset-0 flex items-center justify-center text-white font-medium text-sm cursor-pointer opacity-0 group-hover:opacity-100 bg-black bg-opacity-40 transition-all duration-200'
				onClick={() => {
					imgUploadRef.current?.click();
				}}
			>
				<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
				</svg>
				更换
			</div>
			<div className='w-32 h-32 rounded-full shadow-md border-2 border-gray-100 overflow-hidden'>
				<img src={photo} className="w-full h-full object-cover" alt="用户头像" />
			</div>
			<input
				type='file'
				accept='image/gif,image/jpeg,image/jpg,image/png, image/webp'
				ref={imgUploadRef}
				className='hidden'
				onChange={async (e) => {
					if (!e.target.files || e.target.files.length < 1) return;
					try {
						const res = await uploadImages([e.target.files[0]]);
						setPhoto(res[0].url);
					} catch (e) {
						console.error(e);
					}
				}}
			/>
		</div>
	);
};
