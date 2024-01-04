import { Link } from "react-router-dom";

/**
 * Page to handle all routes not accounted for.
 */
function Error() {
	return (
		<div className="flex flex-col items-center justify-center h-screen gap-8">
			<h1 className="font-semibold text-8xl">404</h1>
			<h3 className="text-lg">The requested page does not exist.</h3>
			<Link
				className=" bg-teal-500 rounded-lg w-[175px] h-[50px] flex justify-center items-center"
				type="button"
				to={"/dashboard"}
			>
				<p className="text-lg font-semibold text-white mb-[2px]">Back to Dashboard</p>
			</Link>
		</div>
	);
}

export default Error;
