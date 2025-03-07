import { useNavigate } from "react-router-dom";
import { NotificationWhite } from "../../assets/smart-attorney-figma/sidebar";
import { UserHeadshot } from "../../assets/smart-attorney-figma/stock";
import { CurrentUser, LS } from "../../utils/local-storage";

function SignedInUser() {
	const navigate = useNavigate();

	const currentUser = LS.getCurrentUser();
	const { firstName, lastName } = currentUser as CurrentUser;
	const user = `${firstName} ${lastName}`;

	return (
		<div className="absolute right-14 top-8">
			{/* contains the body content of component */}
			<div className="flex flex-row items-center justify-center gap-3">
				<img className="w-5 h-5 cursor-pointer" src={NotificationWhite} onClick={() => navigate("/notifications")} />
				{/* contains avatar and user's name */}
				<div className="flex flex-row items-center justify-center gap-1.5">
					<img className="w-[2.125rem] h-[2.125rem]" src={UserHeadshot} />
					<p className="text-xs font-thin text-white">{user}</p>
				</div>
				<span className="cursor-pointer arrow-down"></span>
			</div>
		</div>
	);
}

export default SignedInUser;
