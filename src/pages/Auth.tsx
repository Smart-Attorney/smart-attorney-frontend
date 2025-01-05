import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getCredentials, getIdentityId } from "../services/aws/cognito-identity";
import { getUser, globalSignOut } from "../services/aws/cognito-identity-provider";
import { getTokens, revokeTokens, TokenEndpointResponseBody } from "../services/aws/federation-endpoints";
import { getCallerIdentity } from "../services/aws/sts";

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
		const authCode = await getAuthorizationCodeFromUrl();
		console.log("auth code: ", authCode);

		const tokensResponse = await getTokens(authCode);
		const tokens: TokenEndpointResponseBody = await tokensResponse?.json();
		console.log("tokens: ", tokens);

		const revokeTokensResponse = await revokeTokens(tokens.refresh_token!);
		const revokedToken = revokeTokensResponse;
		console.log("revoked token: ", revokedToken);

		const user = await getUser(tokens.access_token);
		console.log("user: ", user);

		const globalLogout = await globalSignOut(tokens.access_token);
		console.log("global logout: ", globalLogout);

		const identityId = await getIdentityId(tokens.id_token);
		console.log("identity id: ", identityId);

		const credentials = await getCredentials(identityId!, tokens.id_token);
		console.log("credentials: ", credentials);

		const callerIdentity = await getCallerIdentity(credentials!);
		console.log("caller identity: ", callerIdentity);
	};

	/************************************************************/
	return <div className="w-screen h-screen bg-indigo-700"></div>;
}

export default Auth;
