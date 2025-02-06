import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { getAwsGlobalSignOut } from "../features/settings/api/get-aws-global-sign-out";
import { getUserInfo } from "../features/settings/api/get-user-info";
import SidebarLayout from "../layouts/SidebarLayout";
import { signOutUrl } from "../services/aws/managed-login-endpoints";
import { ResponseBody, User } from "../types/api";

/************************************************************/

interface AccountSectionProps {
	title: string;
	info: string;
}

function AccountSection({ title, info }: AccountSectionProps) {
	return (
		<div className="flex flex-col items-start w-full gap-2 mb-8">
			<h2 className="w-2/5 text-base font-semibold text-black">{title}</h2>
			<p className="w-full py-2 pl-4 overflow-hidden text-base text-black bg-gray-200 rounded-lg text-ellipsis">
				{info}
			</p>
		</div>
	);
}

/************************************************************/

export type UserProfile = Omit<User, "password" | "email" | "firmName" | "id">;

type SettingsProps = {
	userLogout: () => void;
};

function Settings({ userLogout }: SettingsProps) {
	// const navigate = useNavigate();

	const [user, setUser] = useState<UserProfile>({
		// id: "",
		firstName: "",
		lastName: "",
		companyEmail: "",
		// firmName: "",
	});

	useEffect(() => {
		handleGetUserInfo();
	}, []);

	const handleGetUserInfo = async () => {
		try {
			const response = await getUserInfo();
			const body: ResponseBody<UserProfile> = await response.json();
			if (response.ok) {
				setUser(body.data);
			} else {
				alert(body.message);
			}
		} catch (error) {
			alert(error);
		}
	};

	// DEPRECATED: old sign out flow
	// const handleSignOutClick = async () => {
	// 	localStorage.clear();
	// 	navigate("/signin");
	// };

	const handleSignOutClick = async () => {
		try {
			const response = await getAwsGlobalSignOut();
			if (response.ok) {
				localStorage.clear();
				console.log(response.status, response.statusText);
			}
		} catch (error) {
			console.log(error);
		} finally {
			userLogout();
			window.location.href = signOutUrl;
		}
	};

	return (
		<SidebarLayout>
			<div className="flex flex-col items-center justify-center h-screen">
				<div className="flex flex-col items-start justify-center gap-8 p-10 bg-white rounded-3xl w-[26rem]">
					<h1 className="self-center text-4xl font-semibold text-black">Account</h1>
					<div className="flex flex-col w-full">
						<AccountSection title="First Name" info={user.firstName} />
						<AccountSection title="Last Name" info={user.lastName} />
						{/* <AccountSection title="Firm Name" info={user.firmName} /> */}
						<AccountSection title="Company Email" info={user.companyEmail} />
					</div>
					<button
						className="w-full h-12 bg-[rgba(250,50,50,250)] rounded-full"
						type="button"
						onClick={handleSignOutClick}
					>
						<span className="text-lg font-bold text-white">Sign Out</span>
					</button>
				</div>
			</div>
		</SidebarLayout>
	);
}

export default Settings;
