import { FetchWrapper } from "../../../lib/fetch-wrapper";

const fetchApi = async (): Promise<Response> => {
	const endpoint = `/auth/oauth2/aws/cognito-user-pool/global-sign-out`;
	return await new FetchWrapper().get(endpoint);
};

export const getAwsGlobalSignOut = async (): Promise<Response> => {
	return await fetchApi();
};
