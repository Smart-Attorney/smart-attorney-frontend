import {
	CognitoIdentityClient,
	CognitoIdentityClientConfig,
	Credentials,
	GetCredentialsForIdentityCommand,
	GetCredentialsForIdentityCommandInput,
	GetCredentialsForIdentityCommandOutput,
	GetIdCommand,
	GetIdCommandInput,
	GetIdCommandOutput,
} from "@aws-sdk/client-cognito-identity";
import { cognitoAuthConfig } from "../../config/aws-cognito";

export interface LoginsMap {
	[key: string]: string;
}

const { region, identity_pool_id, identity_provider } = cognitoAuthConfig;

const clientConfig: CognitoIdentityClientConfig = { region: region };
const client = new CognitoIdentityClient(clientConfig);

export const getIdentityId = async (idToken: string) => {
	const loginsObj: LoginsMap = { [identity_provider]: idToken };
	const getIdentityIdInput: GetIdCommandInput = {
		IdentityPoolId: identity_pool_id,
		Logins: loginsObj,
	};
	const getIdCommand = new GetIdCommand(getIdentityIdInput);

	try {
		const response: GetIdCommandOutput = await client.send(getIdCommand);
		return response.IdentityId;
	} catch (error) {
		console.log(error);
	}
};

export const getCredentials = async (identityId: string, idToken: string) => {
	const loginsObj: LoginsMap = { [identity_provider]: idToken };
	const getCredentialsInput: GetCredentialsForIdentityCommandInput = {
		IdentityId: identityId,
		Logins: loginsObj,
	};
	const getCredentialsCommand = new GetCredentialsForIdentityCommand(getCredentialsInput);

	try {
		const response: GetCredentialsForIdentityCommandOutput = await client.send(getCredentialsCommand);
		return response.Credentials as Credentials;
	} catch (error) {
		console.log(error);
	}
};
