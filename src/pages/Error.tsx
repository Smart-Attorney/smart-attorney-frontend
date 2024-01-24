import { useNavigate } from "react-router-dom";
import SidebarLayout from "../layouts/SidebarLayout";

/**
 * Page to handle all routes not accounted for.
 */
function Error() {
	const navigate = useNavigate();

	return (
		<SidebarLayout>
			<div className="flex flex-col items-center justify-center h-screen gap-8">
				<h1 className="font-semibold text-white text-8xl">404</h1>
				<h3 className="text-lg text-white">
					The requested page is either under construction or perhaps does not exist... yet!
				</h3>
				<button
					className=" bg-teal-500 rounded-lg w-[200px] h-[50px] flex justify-center items-center"
					type="button"
					onClick={() => navigate("/dashboard")}
				>
					<p className="text-lg font-semibold text-white mb-[2px]">Back to Dashboard</p>
				</button>
			</div>
		</SidebarLayout>
	);
}

export default Error;
