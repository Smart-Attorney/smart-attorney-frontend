import { useLocation } from "react-router-dom";
import { cognitoAuthConfig } from "../config/aws-cognito";
import { getCredentials, getIdentityId, LoginsMap } from "../services/aws/cognito-identity";
import { getCallerIdentity } from "../services/aws/sts";

function Auth() {
	const location = useLocation();
	const { identity_pool_id, identity_provider } = cognitoAuthConfig;

	// get id_token returned from cognito user pool
	const idToken = location.hash.match(/(?<=id_token=)(.*)(?=&access_token)/)?.[0];
	const accessToken = location.hash.match(/(?<=access_token=)(.*)(?=&expires_in)/)?.[0];
	const expiresIn = location.hash.match(/(?<=expires_in=)(.*)(?=&token_type)/)?.[0];
	const tokenType = location.hash.match(/(?<=token_type=)(.*)(?=)/)?.[0];

	/************************************************************/

	const loginsObj: LoginsMap = { [identity_provider]: idToken! };

	getIdentityId(identity_pool_id, loginsObj).then((id) => {
		console.log("identity_id:", id);

		getCredentials(id!, loginsObj).then((creds) => {
			console.log("credentials:", creds);

			getCallerIdentity(creds!).then((info) => {
				console.log("user_info:", info);
			});
		});
	});

	/************************************************************/
	return (
		<>
			<pre className="w-screen"> ID Token: {idToken} </pre>
			<pre className="w-screen"> Access Token: {accessToken} </pre>
			<pre className="w-screen"> Expires In: {expiresIn} </pre>
			<pre className="w-screen"> Token Type: {tokenType} </pre>
			<hr />
			<pre className="w-screen"></pre>
		</>
	);
}

export default Auth;
