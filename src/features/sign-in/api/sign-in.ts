import UserController from "../../../services/mock-backend/controller/user-controller";

export interface SignInCredentialsDTO {
	companyEmail: string;
	password: string;
}

const mockApi = async (data: SignInCredentialsDTO) => {
	const options = { method: "POST", body: JSON.stringify(data) };
	const request = new Request("/signin", options);
	return await UserController.verifyUser(request);
};

export const signInWithEmailAndPassword = async (data: SignInCredentialsDTO) => {
	return await mockApi(data); // replace this when using dedicated backend
};
