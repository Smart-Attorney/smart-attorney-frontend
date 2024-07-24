import { useLocalBackend } from "../../../config/use-local-backend";
import { fetchWrapper } from "../../../lib/fetch-wrapper";
import { mockRequest } from "../../../lib/mock-request";
import { UserController } from "../../../services/local-backend/user/user-controller";
import { User } from "../../../types/api";

export type RegisterUserDTO = Omit<User, "id" | "email">;

const baseUrl = "http://localhost:8080";
const endpoint = "/auth/register";

const mockApi = async (data: RegisterUserDTO) => {
	const request = mockRequest.post(endpoint, data);
	return await new UserController().postUserHandler(request);
};

const fetchApi = async (data: RegisterUserDTO) => {
	const absoluteUrl = baseUrl + endpoint;
	return await fetchWrapper.post(absoluteUrl, data);
};

export const register = async (data: RegisterUserDTO) => {
	return useLocalBackend ? await mockApi(data) : await fetchApi(data);
};
