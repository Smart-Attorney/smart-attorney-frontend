import { useNavigate } from "react-router-dom";
import StyledBackground from "../layouts/StyledBackground";

/*
 * Page to handle all routes not accounted for.
 */
function NotFound() {
	const navigate = useNavigate();

	return (
		<StyledBackground>
			<div className="flex flex-col items-center justify-center h-screen gap-8">
				<h1 className="font-semibold text-white text-8xl">404</h1>
				<h3 className="text-lg text-white">The requested page does not exist!</h3>
				<button
					className=" bg-teal-500 rounded-lg w-[200px] h-[50px] flex justify-center items-center"
					type="button"
					onClick={() => navigate("/home")}
				>
					<p className="text-lg font-semibold text-white">Please Sign In</p>
				</button>
			</div>
		</StyledBackground>
	);
}

export default NotFound;
