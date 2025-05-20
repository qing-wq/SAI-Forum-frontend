import { useNavigate } from "react-router-dom";

/**
 * 返回按钮
 */
const BackButton = () => {
	const navigate = useNavigate();
	return <button 
		className="px-4 py-1.5 rounded-md text-gray-600 hover:text-purple-700 border border-gray-200 hover:border-purple-200 hover:bg-purple-50 transition-all duration-200 flex items-center gap-1.5 text-sm font-medium"
		onClick={() => navigate(-1)}
	>
		<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
		</svg>
		返回
	</button>;
};

export default BackButton;
