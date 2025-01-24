const fetchApi = async (authzCode: String): Promise<Response> => {
	const absoluteUrl = process.env.LOCAL_SERVER_HOST + `/auth/oauth2/token/` + authzCode;

	const options: RequestInit = {
		method: "GET",
		credentials: "include",
	};

	return fetch(absoluteUrl, options);
};

export const getJsonWebTokens = async (authzCode: String): Promise<Response> => {
	return fetchApi(authzCode);
};
