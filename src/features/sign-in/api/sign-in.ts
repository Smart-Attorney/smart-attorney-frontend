import { UserController } from "../../../services/mock-backend/controller/user-controller";

export interface SignInCredentialsDTO {
	companyEmail: string;
	password: string;
}

const mockApi = async (data: SignInCredentialsDTO) => {
	const options = { method: "POST", body: JSON.stringify(data) };
	const request = new Request("/signin", options);
	return await UserController.verifyUser(request);
};

// @ts-ignore
// for the future
const signIn = async (credentials: SignInCredentialsDTO) => {
	const options = {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(credentials),
	};
	return await fetch("http://localhost:4000/api/user/login", options);
};

export const signInWithEmailAndPassword = async (data: SignInCredentialsDTO) => {
	return await mockApi(data); // replace this when using dedicated backend
};
