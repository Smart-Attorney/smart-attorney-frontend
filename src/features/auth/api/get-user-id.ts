import { ResponseBody } from "../../../types/api";

const fetchApi = async (): Promise<Response> => {
	const absoluteUrl = process.env.LOCAL_SERVER_HOST + `/auth/oauth2/aws/cognito-user-pool/get-user-id`;

	const options: RequestInit = {
		method: "GET",
		credentials: "include",
	};

	return fetch(absoluteUrl, options);
};

export const getUserId = async (): Promise<string> => {
	let userId = "";

	try {
		const response = await fetchApi();
		const body: ResponseBody<string> = await response.json();
		if (response.ok) {
			userId = body.data;
		}
	} catch (error) {
		console.log(error);
	}

	return userId;
};
