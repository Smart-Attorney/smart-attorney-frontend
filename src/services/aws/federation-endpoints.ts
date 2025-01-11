// https://docs.aws.amazon.com/cognito/latest/developerguide/federation-endpoints.html

import { cognitoAuthConfig } from "../../config/aws-cognito";
import { isDevEnv } from "../../utils/is-dev-env";

const { cognito_domain, redirect_uri_hosted, redirect_uri_local, client_id, client_secret } = cognitoAuthConfig;

const redirect_uri = isDevEnv ? redirect_uri_local : redirect_uri_hosted;

export interface TokenEndpointResponseBody {
	access_token: string;
	id_token: string;
	refresh_token?: string; //included when 'grant_type' is 'authorization_code'
	token_type: string;
	expires_in: number;
}

// https://docs.aws.amazon.com/cognito/latest/developerguide/token-endpoint.html
export const getTokens = async (authorizationCode: string) => {
	const endpoint = "/oauth2/token";

	const data =
		`grant_type=authorization_code&` +
		`client_id=${client_id}&` +
		`client_secret=${client_secret}&` +
		`code=${authorizationCode}&` +
		`redirect_uri=${redirect_uri}`;

	const headers: HeadersInit = {
		"Content-Type": "application/x-www-form-urlencoded",
		Authorization: `Basic ${btoa(client_id + ":" + client_secret)}`,
	};

	const url: RequestInfo = cognito_domain + endpoint;

	const options: RequestInit = {
		method: "POST",
		body: data,
		headers: headers,
	};

	const request = new Request(url, options);
	try {
		const response = await fetch(request);
		return response;
	} catch (error) {
		console.log(error);
	}
};

// https://docs.aws.amazon.com/cognito/latest/developerguide/revocation-endpoint.html
export const revokeRefreshToken = async (refreshToken: string) => {
	const endpoint = "/oauth2/revoke";

	const data = `token=${refreshToken}&` + `client_id=${client_id}&`;

	const headers: HeadersInit = {
		"Content-Type": "application/x-www-form-urlencoded",
		Authorization: `Basic ${btoa(client_id + ":" + client_secret)}`,
	};

	const url: RequestInfo = cognito_domain + endpoint;

	const options: RequestInit = {
		method: "POST",
		body: data,
		headers: headers,
	};

	const request = new Request(url, options);
	try {
		const response = await fetch(request);
		return response;
	} catch (error) {
		console.log(error);
	}
};
