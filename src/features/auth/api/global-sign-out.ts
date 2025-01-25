const fetchApi = async (): Promise<Response> => {
	const absoluteUrl = process.env.LOCAL_SERVER_HOST + `/auth/oauth2/aws/cognito-user-pool/global-sign-out`;

	const options: RequestInit = {
		method: "GET",
		credentials: "include",
	};

	return fetch(absoluteUrl, options);
};

export const globalSignOut = async (): Promise<Response> => {
	return fetchApi();
};
