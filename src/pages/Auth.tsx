import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getCredentials, getIdentityId } from "../services/aws/cognito-identity";
import { getUser, revokeAccessToken } from "../services/aws/cognito-identity-provider";
import { getTokens, revokeRefreshToken, TokenEndpointResponseBody } from "../services/aws/federation-endpoints";
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

		const tokensResponse = await getTokens(authCode);
		const tokens: TokenEndpointResponseBody = await tokensResponse?.json();

		const user = await getUser(tokens.access_token);

		const identityId = await getIdentityId(tokens.id_token);

		const credentials = await getCredentials(identityId!, tokens.id_token);

		const callerIdentity = await getCallerIdentity(credentials!);

		const revokeAccessResponse = await revokeAccessToken(tokens.access_token);
		const isAccessRevoked = revokeAccessResponse?.$metadata.httpStatusCode;

		const revokeRefreshResponse = await revokeRefreshToken(tokens.refresh_token!);
		const isRefreshRevoked = revokeRefreshResponse?.status;

		console.log("auth code__________", authCode);
		console.log("tokens_____________", tokens);
		console.log("user info__________", user);
		console.log("identity id________", identityId);
		console.log("credentials________", credentials);
		console.log("caller identity____", callerIdentity);
		console.log("access revoked?____", isAccessRevoked);
		console.log("refresh revoked?___", isRefreshRevoked);
	};

	/************************************************************/
	return <div className="w-screen h-screen bg-indigo-700"></div>;
}

export default Auth;
