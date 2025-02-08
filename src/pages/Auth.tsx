import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AlertErrorSvg from "../assets/misc/alert-error.svg";
import { SmartAttorneyLogo } from "../assets/smart-attorney-figma/global";
import { getCredentials } from "../features/auth/api/get-credentials";
import { getIdentityId } from "../features/auth/api/get-identity-id";
import { getJsonWebTokens } from "../features/auth/api/get-json-web-tokens";
import { getUser } from "../features/auth/api/get-user";
import StyledBackground from "../layouts/StyledBackground";
import { signInUrl } from "../services/aws/managed-login-endpoints";
import { AwsCredentials, ResponseBody } from "../types/api";
import { CurrentUser, LS } from "../utils/local-storage";

type AuthProps = {
	userLogin: () => void;
	startTokensRefresh: () => void;
};

function Auth({ userLogin, startTokensRefresh }: AuthProps) {
	const location = useLocation();
	const navigate = useNavigate();

	/************************************************************/

	useEffect(() => {
		loginFlow();
	}, []);

	const [isLoading, setIsLoading] = useState(true);

	const loginFlow = async () => {
		const authzCode = await getAuthorizationCodeFromUrl();
		if (!authzCode) navigate("/home");

		const hasJwts = await exchangeAuthzCodeForJsonWebTokens(authzCode);
		if (!hasJwts) return;

		const userInfo = await getUserInfoFromUserPool();
		if (!userInfo) return;

		const isUserInfoSet = setUserInfo(userInfo);
		if (!isUserInfoSet) return;

		const hasIdentityId = await getIdentityIdFromIdentityPool();
		if (!hasIdentityId) return;

		const awsCredentials = await getTemporaryAwsCredentials();
		if (!awsCredentials) return;

		const areCredentialsSet = setAwsCredentials(awsCredentials);
		if (!areCredentialsSet) return;

		userLogin();
		startTokensRefresh();

		setTimeout(() => {
			navigate("/dashboard");
		}, 1000);
	};

	const getAuthorizationCodeFromUrl = async (): Promise<string> => {
		const authorizationCode = await location.search.match(/(?<=code=)(.*)(?=)/)?.[0]!;
		return authorizationCode;
	};

	const exchangeAuthzCodeForJsonWebTokens = async (authzCode: string): Promise<boolean> => {
		if (!authzCode) return false;
		if (authzCode.length === 0) return false;
		try {
			const response = await getJsonWebTokens(authzCode);
			if (response.ok) {
				return true;
			}
		} catch (error) {
			setIsLoading(false);
		}
		setIsLoading(false);
		return false;
	};

	const getUserInfoFromUserPool = async (): Promise<CurrentUser | null> => {
		try {
			const response = await getUser();
			if (response.ok) {
				const responseBody: ResponseBody<CurrentUser> = await response.json();
				const currentUser: CurrentUser = responseBody.data;
				return currentUser;
			}
		} catch (error) {
			setIsLoading(false);
		}
		setIsLoading(false);
		return null;
	};

	const setUserInfo = (userInfo: CurrentUser) => {
		LS.setCurrentUser(userInfo);
		const currentUser = LS.getCurrentUser();
		if (currentUser) {
			return true;
		} else {
			setIsLoading(false);
			return false;
		}
	};

	const getIdentityIdFromIdentityPool = async (): Promise<boolean> => {
		try {
			const response = await getIdentityId();
			if (response.ok) {
				return true;
			}
		} catch (error) {
			setIsLoading(false);
		}
		setIsLoading(false);
		return false;
	};

	const getTemporaryAwsCredentials = async (): Promise<AwsCredentials | null> => {
		try {
			const response = await getCredentials();
			if (response.ok) {
				const responseBody: ResponseBody<AwsCredentials> = await response.json();
				const credentials: AwsCredentials = responseBody.data;
				return credentials;
			}
		} catch (error) {
			setIsLoading(false);
		}
		setIsLoading(false);
		return null;
	};

	const setAwsCredentials = (awsCredentials: AwsCredentials): boolean => {
		LS.setAwsCredentials(awsCredentials);
		const credentials = LS.getAwsCredentials();
		if (credentials) {
			return true;
		} else {
			setIsLoading(false);
			return false;
		}
	};

	// globalSignOut and logout endpoint to end user session
	// remove all tokens

	/************************************************************/
	return (
		<StyledBackground>
			<div className="absolute flex flex-col items-center w-screen pt-10">
				<img className="h-28" src={SmartAttorneyLogo} />
			</div>

			{isLoading ? (
				<div className="flex flex-col items-center justify-center w-screen h-screen gap-y-4">
					<div className="self-center loader"></div>
					<h1 className="self-center text-3xl text-white w-fit">Logging in...</h1>
				</div>
			) : (
				<div className="flex flex-col items-center justify-center w-screen h-screen gap-y-4">
					<img className="h-20" src={AlertErrorSvg} />
					<h1 className="self-center text-3xl text-white w-fit">Login failed. Please try again.</h1>
					<a
						className="flex items-center justify-center px-5 bg-white border-2 border-white rounded-lg w-it hover:bg-slate-300 h-14"
						href={signInUrl}
						target="_self"
					>
						<span className="text-xl text-black">Back to sign in</span>
					</a>
				</div>
			)}
		</StyledBackground>
	);
}

export default Auth;
