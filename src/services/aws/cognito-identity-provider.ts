import {
	CognitoIdentityProviderClient,
	CognitoIdentityProviderClientConfig,
	GetUserCommand,
	GetUserCommandInput,
	GetUserCommandOutput,
	GlobalSignOutCommand,
	GlobalSignOutCommandInput,
	GlobalSignOutCommandOutput,
} from "@aws-sdk/client-cognito-identity-provider";
import { cognitoAuthConfig } from "../../config/aws-cognito";

const { region } = cognitoAuthConfig;

const clientConfig: CognitoIdentityProviderClientConfig = { region: region };
const client = new CognitoIdentityProviderClient(clientConfig);

export const getUser = async (accessToken: string) => {
	const getUserInput: GetUserCommandInput = {
		AccessToken: accessToken,
	};
	const getUserCommand = new GetUserCommand(getUserInput);

	try {
		const response: GetUserCommandOutput = await client.send(getUserCommand);
		return response;
	} catch (error) {
		console.log(error);
	}
};

export const revokeAccessToken = async (accessToken: string) => {
	const signOutInput: GlobalSignOutCommandInput = {
		AccessToken: accessToken,
	};
	const signOutCommand = new GlobalSignOutCommand(signOutInput);

	try {
		const response: GlobalSignOutCommandOutput = await client.send(signOutCommand);
		return response;
	} catch (error) {
		console.log(error);
	}
};
