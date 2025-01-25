import { AwsCredentials } from "../types/api";

export class LS {
	private static AWS_CREDENTIALS_KEY = "aws_credentials";

	public static getAwsCredentials(): AwsCredentials | null {
		const storageItem = localStorage.getItem(LS.AWS_CREDENTIALS_KEY);
		if (!storageItem) return null;
		const awsCredentials: AwsCredentials = JSON.parse(storageItem);
		return awsCredentials;
	}

	public static setAwsCredentials(awsCredentials: AwsCredentials): void {
		localStorage.setItem(LS.AWS_CREDENTIALS_KEY, JSON.stringify(awsCredentials));
	}
}
