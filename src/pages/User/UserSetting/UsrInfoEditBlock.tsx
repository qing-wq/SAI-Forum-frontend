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
		<form className='mycard p-8 first:flex-row gap-10'>
			<div className='w-[40%] flex flex-col gap-4'>
				{Object.keys(leftPartOfForm).map((key) => {
					const item =
						leftPartOfForm[key as keyof typeof leftPartOfForm];
					return (
						<span key={item["label"]}>
							<h2 className='font-bold text-2xl pb-2'>
								{item["label"]}
								{item["required"] ? "*" : ""}
							</h2>
							<input
								type='text'
								placeholder={item["label"]}
								className='input input-bordered w-full'
								value={
									userInfo[key as keyof typeof leftPartOfForm]
								}
								onChange={changeValue(
									key as keyof typeof leftPartOfForm
								)}
							/>
						</span>
					);
				})}
				<div className='btn btn-primary w-full mt-4' onClick={submit}>
					保存
				</div>
			</div>
			<div className='flex-1 flex flex-col gap-4'>
				<span className='flex flex-col'>
					<h2 className='font-bold text-2xl pb-2'>头像</h2>
					<AvatarEdit
						photo={userInfo.photo}
						setPhoto={(photo: string) => {
							changeValue("photo")({ target: { value: photo } });
						}}
					/>
				</span>
				<span className='flex-1 flex flex-col'>
					<h2 className='font-bold text-2xl pb-2'>个人简介</h2>
					<textarea
						className='textarea textarea-bordered w-full flex-1 resize-none'
						placeholder='个人简介'
						value={userInfo.profile}
						onChange={changeValue("profile")}
						maxLength={100}
					/>
				</span>
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
		<div className='avatar group self-center'>
			<div
				className='w-64 rounded absolute leading-[15rem] text-center text-white text-lg font-bold cursor-pointer group-hover:block first:hidden bg-slate-600 bg-opacity-50'
				onClick={() => {
					imgUploadRef.current?.click();
				}}
			>
				修改头像 🖋
			</div>
			<div className='w-64 rounded'>
				<img src={photo} />
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
