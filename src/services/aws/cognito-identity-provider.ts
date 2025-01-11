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

// https://docs.aws.amazon.com/cognito-user-identity-pools/latest/APIReference/API_GetUser.html
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

// https://docs.aws.amazon.com/cognito-user-identity-pools/latest/APIReference/API_GlobalSignOut.html
export const globalSignOut = async (accessToken: string) => {
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

	// https://docs.aws.amazon.com/cognito-user-identity-pools/latest/APIReference/API_RevokeToken.html
};
