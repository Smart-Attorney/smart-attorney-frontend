import { mockRequest } from "../../../lib/mock-request";
import { UserController } from "../../../services/mock-backend/controller/user-controller";

export interface RegisterCredentialsDTO {
	firstName: string;
	lastName: string;
	firmName: string;
	companyEmail: string;
	password: string;
}

const mockApi = async (data: RegisterCredentialsDTO) => {
	const request = mockRequest.put("/register", data);
	return await UserController.registerUser(request);
};

export const registerNewUser = async (data: RegisterCredentialsDTO) => {
	return await mockApi(data);
};
