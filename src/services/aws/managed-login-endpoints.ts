// https://docs.aws.amazon.com/cognito/latest/developerguide/managed-login-endpoints.html

import { cognitoAuthConfig } from "../../config/aws-cognito";
import { isDevEnv } from "../../utils/is-dev-env";

const {
	cognito_domain,
	client_id,
	response_type,
	scope,
	redirect_uri_local,
	redirect_uri_hosted,
	logout_uri_local,
	logout_uri_hosted,
} = cognitoAuthConfig;

const redirect_uri = isDevEnv ? redirect_uri_local : redirect_uri_hosted;
const logout_uri = isDevEnv ? logout_uri_local : logout_uri_hosted;

export const signUpUrl =
	`${cognito_domain}` +
	`/signup` +
	`?client_id=${client_id}` +
	`&response_type=${response_type}` +
	`&scope=${scope}` +
	`&redirect_uri=${encodeURIComponent(redirect_uri)}`;

export const signInUrl =
	`${cognito_domain}` +
	`/login` +
	`?client_id=${client_id}` +
	`&response_type=${response_type}` +
	`&scope=${scope}` +
	`&redirect_uri=${encodeURIComponent(redirect_uri)}`;

export const signOutUrl =
	`${cognito_domain}` + `/logout` + `?client_id=${client_id}` + `&logout_uri=${encodeURIComponent(logout_uri)}`;
