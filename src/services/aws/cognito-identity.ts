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

const { region } = cognitoAuthConfig;

const cognitoIdentityClientConfig: CognitoIdentityClientConfig = { region: region };
const cognitoIdentityClient = new CognitoIdentityClient(cognitoIdentityClientConfig);

export const getIdentityId = async (identityPoolId: string, loginsObj: LoginsMap) => {
	const getIdentityIdInput: GetIdCommandInput = {
		IdentityPoolId: identityPoolId,
		Logins: loginsObj,
	};
	const getIdCommand = new GetIdCommand(getIdentityIdInput);

	try {
		const response: GetIdCommandOutput = await cognitoIdentityClient.send(getIdCommand);
		return response.IdentityId;
	} catch (error) {
		console.log(error);
	}
};

export const getCredentials = async (identityId: string, loginsObj: LoginsMap) => {
	const getCredentialsInput: GetCredentialsForIdentityCommandInput = {
		IdentityId: identityId,
		Logins: loginsObj,
	};
	const getCredentialsCommand = new GetCredentialsForIdentityCommand(getCredentialsInput);

	try {
		const response: GetCredentialsForIdentityCommandOutput = await cognitoIdentityClient.send(getCredentialsCommand);
		return response.Credentials as Credentials;
	} catch (error) {
		console.log(error);
	}
};
