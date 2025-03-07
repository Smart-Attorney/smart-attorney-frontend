const fetchApi = async (): Promise<Response> => {
	const absoluteUrl =
		process.env.LOCAL_SERVER_HOST + `/auth/oauth2/aws/cognito-identity-pool/get-credentials-for-identity`;

	const options: RequestInit = {
		method: "GET",
		credentials: "include",
	};

	return fetch(absoluteUrl, options);
};

export const getCredentials = async (): Promise<Response> => {
	return fetchApi();
};
