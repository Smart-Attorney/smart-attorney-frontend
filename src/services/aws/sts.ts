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

// https://docs.aws.amazon.com/STS/latest/APIReference/API_GetCallerIdentity.html
export const getCallerIdentity = async (credentials: Credentials) => {
	const stsCredentials: AwsCredentialIdentity = {
		accessKeyId: credentials?.AccessKeyId!,
		secretAccessKey: credentials?.SecretKey!,
		sessionToken: credentials?.SessionToken,
	};

	const clientConfig: STSClientConfig = { region: region, credentials: stsCredentials };
	const client = new STSClient(clientConfig);

	const getCallerIdentityInput: GetCallerIdentityCommandInput = {};
	const getCallerIdentityCommand = new GetCallerIdentityCommand(getCallerIdentityInput);

	try {
		const response: GetCallerIdentityCommandOutput = await client.send(getCallerIdentityCommand);
		return response;
	} catch (error) {
		console.log(error);
	}
};
