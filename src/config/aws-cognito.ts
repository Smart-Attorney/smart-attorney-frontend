export const cognitoAuthConfig = {
	authority: "https://cognito-idp.us-east-2.amazonaws.com/us-east-2_RZbG9wM8w",
	cognito_domain: "https://us-east-2rzbg9wm8w.auth.us-east-2.amazoncognito.com",

	client_id: "7eo6vpk94c7aqkgj0t94b3daec",
	client_secret: "1apm99rb1illq38f7m9tgdvbc66u1vlt2cbb996gvqolvp99gcnk",

	response_type: "code",
	scope: "aws.cognito.signin.user.admin email openid phone",

	redirect_uri_hosted: "https://smartattorney.netlify.app/auth",
	redirect_uri_local: "http://localhost:5173/auth",

	logout_uri_hosted: "https://smartattorney.netlify.app",
	logout_uri_local: "http://localhost:5173",

	identity_pool_id: "us-east-2:b3730f0a-2093-46d5-bc75-9376e4c7772b",
	identity_provider: "cognito-idp.us-east-2.amazonaws.com/us-east-2_RZbG9wM8w",
	region: "us-east-2",
};
