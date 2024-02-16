import UserController from "../../../services/mock-backend/controller/user-controller";

export interface SignInCredentialsDTO {
	email: string;
	password: string;
}

const mockApi = async (data: SignInCredentialsDTO) => {
	const request = new Request("/signin", { method: "POST", body: JSON.stringify(data) });
	return await UserController.verifyUser(request);
};

export const signInWithEmailAndPassword = async (data: SignInCredentialsDTO) => {
	return await mockApi(data); // replace this when using dedicated backend
};
