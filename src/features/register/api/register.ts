import { UserController } from "../../../services/mock-backend/controller/user-controller";

export interface RegisterCredentialsDTO {
	firstName: string;
	lastName: string;
	firmName: string;
	companyEmail: string;
	password: string;
}

const mockApi = async (data: RegisterCredentialsDTO) => {
	const options = { method: "POST", body: JSON.stringify(data) };
	const request = new Request("/register", options);
	return await UserController.registerUser(request);
};

export const registerNewUser = async (data: RegisterCredentialsDTO) => {
	return await mockApi(data);
};
