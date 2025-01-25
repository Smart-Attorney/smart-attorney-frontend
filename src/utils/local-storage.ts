import { AwsCredentials } from "../types/api";

export type CurrentUser = {
	firstName: string;
	lastName: string;
};

export class LS {
	private static AWS_CREDENTIALS_KEY = "aws_credentials";
	private static CURRENT_USER_KEY = "current_user";

	public static getAwsCredentials(): AwsCredentials | null {
		const storageItem = localStorage.getItem(LS.AWS_CREDENTIALS_KEY);
		if (!storageItem) return null;
		const awsCredentials: AwsCredentials = JSON.parse(storageItem);
		return awsCredentials;
	}

	public static setAwsCredentials(awsCredentials: AwsCredentials): void {
		localStorage.setItem(LS.AWS_CREDENTIALS_KEY, JSON.stringify(awsCredentials));
	}

	public static getCurrentUser(): CurrentUser | null {
		const storageItem = localStorage.getItem(LS.CURRENT_USER_KEY);
		if (!storageItem) return null;
		const currentUser: CurrentUser = JSON.parse(storageItem);
		return currentUser;
	}

	public static setCurrentUser(currentUser: CurrentUser): void {
		localStorage.setItem(LS.CURRENT_USER_KEY, JSON.stringify(currentUser));
	}
}
