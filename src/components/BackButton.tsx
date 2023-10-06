import { useNavigate } from "react-router-dom";

/**
 * 返回按钮
 */
const BackButton = () => {
	const navigate = useNavigate();
	return <button onClick={() => navigate(-1)}>返回</button>;
};

export default BackButton;
