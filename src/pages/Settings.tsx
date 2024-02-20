import { useNavigate } from "react-router-dom";
import SidebarLayout from "../layouts/SidebarLayout";

function Settings() {
	const navigate = useNavigate();

	return (
		<SidebarLayout>
			<div className="flex flex-col items-center justify-center h-screen gap-8">
				<h1 className="text-4xl text-white">Account</h1>
				<div className="grid items-center grid-cols-2 gap-x-8 gap-y-4">
					{/*  */}
					<h4 className="text-right text-white">First Name:</h4>
					<p className="px-2 py-1 text-black bg-gray-300 rounded-sm">Jane</p>
					{/*  */}
					<h4 className="text-right text-white">Last Name:</h4>
					<p className="px-2 py-1 text-black bg-gray-300 rounded-sm">Doe</p>
					{/*  */}
					<h4 className="text-right text-white">Firm Name:</h4>
					<p className="px-2 py-1 text-black bg-gray-300 rounded-sm">Law Group</p>
					{/*  */}
					<h4 className="text-right text-white">Company Email:</h4>
					<p className="px-2 py-1 text-black bg-gray-300 rounded-sm">a@b.c</p>
					{/*  */}
				</div>
				<button className="w-40 h-12 bg-teal-500 rounded-xl" type="button" onClick={() => navigate("/signin")}>
					<span className="text-lg font-bold text-white">Sign Out</span>
				</button>
			</div>
		</SidebarLayout>
	);
}

export default Settings;
