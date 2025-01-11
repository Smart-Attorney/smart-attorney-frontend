import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { AuthzCodeDTO, getJwts } from "../features/auth/api/get-jwts";

function Auth() {
	const location = useLocation();

	/************************************************************/

	useEffect(() => {
		testFlow();
	}, []);

	const getAuthorizationCodeFromUrl = async () => {
		const authorizationCode = await location.search.match(/(?<=code=)(.*)(?=)/)?.[0]!;
		return authorizationCode;
	};

	const testFlow = async () => {
		const authzCode = await getAuthorizationCodeFromUrl();

		const data: AuthzCodeDTO = {
			code: authzCode,
		};
		const response = await getJwts(data);

		console.log(response);
		console.log(await response.json());

		// globalSignOut and logout endpoint to end user session
		// remove all tokens
	};

	/************************************************************/
	return <div className="w-screen h-screen bg-indigo-700"></div>;
}

export default Auth;
