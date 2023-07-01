import React, { useState } from "react";
import LoginBox from "./LoginBox";
import RegisterBox from "./RegisterBox";
import SquareBox from "../../layouts/SquareBox";

import bg from "../../asset/images/login-bg.svg";
const Login = () => {
	const [boxActive, setBoxActive] = useState(false);
	return (
		<div className='group'>
			{/* background */}
			<div className='absolute bottom-0 w-screen overflow-hidden select-none'>
				<img
					className='select-none'
					src={bg}
					alt='bg'
					style={{ minWidth: "1920px" }}
					onDragStart={(e) => {
						if (e && e.preventDefault) {
							e.preventDefault();
						}
						// else {
						// 	window.event?.returnValue = false;
						// }
					}}
				/>
			</div>
			<div className=' absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
				<SquareBox
					square={{
						front: <LoginBox change={setBoxActive} />,
						right: <RegisterBox change={setBoxActive} />,
					}}
					edgeLength='500px'
					rotate={{
						direction: "right",
						fromDeg: 0,
						deg: 90,
						speed: 0.5,
						elseDirection: "up",
						elseDeg: 10,
					}}
					active={boxActive}
				/>
				{/* <LoginBox />
			<RegisterBox /> */}
			</div>
		</div>
	);
};

export default Login;
