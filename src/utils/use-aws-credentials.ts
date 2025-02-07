import { getCredentials } from "../features/auth/api/get-credentials";
import { AwsCredentials, ResponseBody } from "../types/api";
import { LS } from "./local-storage";

export const useAwsCredentials = async () => {
	const awsCreds = LS.getAwsCredentials();

	// check if credentials exist
	if (awsCreds == null) {
		const newAwsCreds = await requestNewCredentials();
		if (!newAwsCreds) {
			alert("Encountered an error when attempting to request AWS credentials.");
		}
		return newAwsCreds;
	}

	// check if credentials have expired
	if (areCredentialsExpired(awsCreds)) {
		const newAwsCreds = await requestNewCredentials();
		if (!newAwsCreds) {
			alert("Encountered an error when attempting to request AWS credentials.");
		}
		return newAwsCreds;
	}

	return awsCreds;
};

const requestNewCredentials = async (): Promise<AwsCredentials | null> => {
	try {
		const response = await getCredentials();
		if (response.ok) {
			const resBody: ResponseBody<AwsCredentials> = await response.json();
			const awsCreds = resBody.data;
			LS.setAwsCredentials(awsCreds);
			return awsCreds;
		}
	} catch (error) {
		console.log(error);
	}

	return null;
};

const areCredentialsExpired = (awsCreds: AwsCredentials): boolean => {
	const expirationDate = new Date(awsCreds.expiration);
	const expirationMillis = expirationDate.getTime();
	const fiveMinutesMillis = 300000;
	const fiveMinutesBeforeExpiration = expirationMillis - fiveMinutesMillis;
	const nowMillis = Date.now();

	return nowMillis > fiveMinutesBeforeExpiration;
};
