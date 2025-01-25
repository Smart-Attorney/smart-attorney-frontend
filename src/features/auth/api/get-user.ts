const fetchApi = async (): Promise<Response> => {
	const absoluteUrl = process.env.LOCAL_SERVER_HOST + `/auth/oauth2/aws/cognito-user-pool/get-user`;

	const options: RequestInit = {
		method: "GET",
		credentials: "include",
	};

	return fetch(absoluteUrl, options);
};

export const getUser = async (): Promise<Response> => {
	return fetchApi();
};
