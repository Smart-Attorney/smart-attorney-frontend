import { Credentials } from "@aws-sdk/client-cognito-identity";
import {
	GetCallerIdentityCommand,
	GetCallerIdentityCommandInput,
	GetCallerIdentityCommandOutput,
	STSClient,
	STSClientConfig,
} from "@aws-sdk/client-sts";
import { AwsCredentialIdentity } from "@aws-sdk/types";
import { cognitoAuthConfig } from "../../config/aws-cognito";

const { region } = cognitoAuthConfig;

export const getCallerIdentity = async (credentials: Credentials) => {
	const stsCredentials: AwsCredentialIdentity = {
		accessKeyId: credentials?.AccessKeyId!,
		secretAccessKey: credentials?.SecretKey!,
		sessionToken: credentials?.SessionToken,
	};

	const stsClientConfig: STSClientConfig = { region: region, credentials: stsCredentials };
	const stsClient = new STSClient(stsClientConfig);

	const getCallerIdentityInput: GetCallerIdentityCommandInput = {};
	const getCallerIdentityCommand = new GetCallerIdentityCommand(getCallerIdentityInput);

	try {
		const response: GetCallerIdentityCommandOutput = await stsClient.send(getCallerIdentityCommand);
		return response;
	} catch (error) {
		console.log(error);
	}
};
