export const cognitoAuthConfig = {
	authority: "https://cognito-idp.us-east-2.amazonaws.com/us-east-2_RZbG9wM8w",
	cognito_domain: "https://us-east-2rzbg9wm8w.auth.us-east-2.amazoncognito.com",
	client_id: "lkfl0igiketrigb6pk7r4di9f",
	redirect_uri_local: "http://localhost:5173/auth",
	redirect_uri_hosted: "https://smartattorney.netlify.app/auth",
	response_type: "token",
	scope: "email openid phone",

	identity_pool_id: "us-east-2:b3730f0a-2093-46d5-bc75-9376e4c7772b",
	identity_provider: "cognito-idp.us-east-2.amazonaws.com/us-east-2_RZbG9wM8w",
	region: "us-east-2",
};
