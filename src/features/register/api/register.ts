import { useLocalBackend } from "../../../config/use-local-backend";
import { fetchWrapper } from "../../../lib/fetch-wrapper";
import { mockRequest } from "../../../lib/mock-request";
import { UserController } from "../../../services/local-backend/user/user-controller";

export interface RegisterCredentialsDTO {
	firstName: string;
	lastName: string;
	firmName: string;
	companyEmail: string;
	password: string;
}

const mockApi = async (data: RegisterCredentialsDTO) => {
	const request = mockRequest.put("/", data);
	return await new UserController().registerUser(request);
};

const fetchApi = async (data: RegisterCredentialsDTO) => {
	const url = "http://localhost:8080/register";
	return await fetchWrapper.post(url, data);
};

export const registerNewUser = async (data: RegisterCredentialsDTO) => {
	return useLocalBackend ? await mockApi(data) : await fetchApi(data);
};
