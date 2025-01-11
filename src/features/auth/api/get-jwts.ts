export type AuthzCodeDTO = {
	code: string;
};

const fetchApi = async (data: AuthzCodeDTO): Promise<Response> => {
	const absoluteUrl = process.env.LOCAL_SERVER_HOST + `/auth/oauth2/token`;

	const myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");

	const options: RequestInit = {
		method: "POST",
		credentials: "include",
		headers: myHeaders,
		body: JSON.stringify(data),
	};

	return fetch(absoluteUrl, options);
};

export const getJwts = async (data: AuthzCodeDTO): Promise<Response> => {
	return fetchApi(data);
};
