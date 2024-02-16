import UserController from "../../../services/mock-backend/controller/user-controller";

export interface SignInCredentialsDTO {
	email: string;
	password: string;
}

export const signInWithEmailAndPassword = async (data: SignInCredentialsDTO) => {
	// return axios.post("/signin", data); for when there is a dedicated backend
	return await UserController.verifyUser(data);
};
