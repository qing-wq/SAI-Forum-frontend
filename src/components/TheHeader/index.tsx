import React, { useState, memo, useEffect, useRef } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import "./TheHeader.css";
import { log } from "console";
import useAuthTo from "@/auth/useAuthTo";
import { HeaderUserInfo } from "./HeaderUserInfo";
import useCategorysStore from "@/stores/useCategorysStore";
import logo from "../../asset/images/sai-logo.svg"

/**
 * 页头组件
 */
export default memo(function TheHeader() {
	const [searchInput, setSearchInput] = useState<string>("");
	const [searchHints, setSearchHints] = useState<SearchHintItem[]>([]);
	const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);
	const [search, setSearch] = useSearchParams();
	const authTo = useAuthTo();
	const navigate = useNavigate();
	const searchRef = useRef<HTMLDivElement>(null);
	
	// 获取分类激活当前分类的导航选项
	const category = search.get("category");
	
	// 防抖函数
	const useDebounce = (value: string, delay: number) => {
		const [debouncedValue, setDebouncedValue] = useState(value);
		
		useEffect(() => {
			const handler = setTimeout(() => {
				setDebouncedValue(value);
			}, delay);
			
			return () => {
				clearTimeout(handler);
			};
		}, [value, delay]);
		
		return debouncedValue;
	};
	
	const debouncedSearchTerm = useDebounce(searchInput, 300);
	
	// 定义搜索结果接口
	interface SearchHintItem {
		id: number;
		title: string;
		sort: number | null;
		createTime: string;
	}

	interface SearchHintResponse {
		status: {
			code: number;
			msg: string;
		};
		result: {
			key: string;
			items: SearchHintItem[];
		};
	}

	// 获取搜索提示
	useEffect(() => {
		const fetchSearchHints = async () => {
			if (debouncedSearchTerm && debouncedSearchTerm.trim() !== "") {
				try {
					// 使用与全局定义相同的后端 URL
					const response = await fetch(`/api/search/api/hint?key=${encodeURIComponent(debouncedSearchTerm)}`);
					if (response.ok) {
						const data: SearchHintResponse = await response.json();
						
						// 检查响应状态码和结果
						if (data.status.code === 200 && data.result && data.result.items) {
							// 存储整个搜索提示项，包含id和标题
							setSearchHints(data.result.items);
							setIsDropdownVisible(data.result.items.length > 0);
						} else {
							setSearchHints([]);
						}
					} else {
						setSearchHints([]);
					}
				} catch (error) {
					console.error("搜索提示获取失败:", error);
					setSearchHints([]);
				}
			} else {
				setSearchHints([]);
				setIsDropdownVisible(false);
			}
		};
		
		fetchSearchHints();
	}, [debouncedSearchTerm]);
	
	// 处理点击外部关闭下拉框
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
				setIsDropdownVisible(false);
			}
		};
		
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);
	
	// 处理搜索输入
	const inputSearch = ({
		currentTarget,
	}: React.FormEvent<HTMLInputElement>) => {
		setSearchInput(currentTarget.value);
		if (currentTarget.value.trim() !== "") {
			setIsDropdownVisible(true);
		} else {
			setIsDropdownVisible(false);
		}
	};
	
	// 处理搜索提示点击
	const handleHintClick = (item: SearchHintItem) => {
		// 移除设置搜索输入的行为
		setIsDropdownVisible(false);
		// 跳转到文章详情页
		navigate(`/article/${item.id}`);
	};
	
	// 处理搜索提交
	const handleSearchSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (searchInput.trim() !== "") {
			setIsDropdownVisible(false);
			// 跳转到搜索结果页面
			navigate(`/home/?search=${encodeURIComponent(searchInput)}`);
		}
	};
	return (
		// TODO: 下滑收缩页头
		<header className='navbar 2xl:gap-2 2xl:px-[200px] bg-white border-b border-gray-100 sticky top-0 shadow-sm z-10 h-16 flex items-center px-8'>
			{/* title */}
			<div className='flex-none flex items-center gap-2 ml-2'>
				<a className='flex items-center gap-2' href='/'>
					<img src={logo} alt="SAI论坛LOGO" className="h-12 w-auto" />
				</a>
			</div>
			{/* navigate */}
			<div className='flex-auto flex gap-1 2xl:gap-2 items-center ml-2'>
				{navList.map((nav) => (
					<Link
						key={nav}
						className={
							"px-2 py-1 rounded-md text-[16px] font-medium transition-all duration-150 " +
							(category === nav
								? "text-[#7c3aed] bg-[#f7f5fe] font-bold"
								: "text-gray-700 hover:text-[#7c3aed] hover:bg-[#f7f5fe]")
						}
						to={`/home/?category=${nav}`}
					>
						{nav}
					</Link>
				))}
			</div>
			<div className='flex-none flex items-center gap-2 '>
				{/* AI Search */}
				<Link to="/ai-search" className='h-9 px-4 rounded-md bg-gradient-to-r btn-secondary text-white font-bold flex items-center text-base shadow-none border-none hover:opacity-90 transition'>
					<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
					</svg>
					AI搜索
				</Link>
				{/* write */}
				<button
					className='h-9 px-4 rounded-md btn-primary text-white font-bold text-base shadow-none border-none hover:bg-[#6a3ce3] transition'
					onClick={() => {
						authTo("./edit-article/new/0", false, true);
					}}
				>
					写文章
				</button>
				<button className='h-9 px-4 rounded-md bg-gray-100 text-[#7c3aed] font-bold text-base shadow-none border border-gray-200 hover:bg-[#f7f5fe] transition'
				onClick={() => {
					authTo("./draft", false, true);
				}}
				>
					草稿
				</button>
				{/* search */}
				<div className='form-control relative' ref={searchRef}>
					<form onSubmit={handleSearchSubmit} className="relative">
						<input
							type='text'
							placeholder='搜索'
							className='input w-full h-9 text-sm bg-white/80 backdrop-blur-sm border-2 border-purple-100 focus:border-[#6057e9] focus:outline-none rounded-md pl-10 pr-4 transition-all duration-300 shadow-sm hover:shadow'
							value={searchInput}
							onChange={inputSearch}
							onFocus={() => searchInput.trim() !== "" && setIsDropdownVisible(true)}
						/>
						<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
						</svg>
					</form>
					{isDropdownVisible && searchHints.length > 0 && (
						<div 
							className='absolute top-full left-0 w-full z-30 mt-2 bg-white/95 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-purple-100 max-h-60'
						>
							<div className="p-2 text-xs text-gray-500 bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-100">
								搜索建议
							</div>
							<div className="overflow-auto max-h-52">
								{searchHints.map((item) => (
									<div 
										key={item.id} 
										className='p-3 hover:bg-purple-50 cursor-pointer flex items-center transition-colors duration-200'
										onClick={() => handleHintClick(item)}
									>
										<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
										</svg>
										<span className="line-clamp-1">{item.title}</span>
									</div>
								))}
							</div>
						</div>
					)}
				</div>
				{/* user */}
				<HeaderUserInfo />
			</div>
		</header>
	);
});

const navList = [
	"全部",
	"人工智能",
	"前端",
	"后端",
	"Android",
	"小车",
	"定位",
	"无人机",
	"ros",
];
