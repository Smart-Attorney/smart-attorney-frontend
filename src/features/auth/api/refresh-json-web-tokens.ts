const fetchApi = async (): Promise<Response> => {
	const absoluteUrl = process.env.LOCAL_SERVER_HOST + "/auth/oauth2/aws/token-refresh";

	const options: RequestInit = {
		method: "GET",
		credentials: "include",
	};

	return fetch(absoluteUrl, options);
};

export const refreshJsonWebTokens = async (): Promise<Response> => {
	return fetchApi();
};
