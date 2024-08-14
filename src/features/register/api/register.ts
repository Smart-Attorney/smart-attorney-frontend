import { useLocalBackend } from "../../../config/use-local-backend";
import { FetchWrapper } from "../../../lib/fetch-wrapper";
import { mockRequest } from "../../../lib/mock-request";
import { UserController } from "../../../services/local-backend/user/user-controller";
import { User } from "../../../types/api";

export type RegisterUserDTO = Omit<User, "id" | "email">;

const endpoint = "/auth/register";

const mockApi = async (data: RegisterUserDTO) => {
	const request = mockRequest.post(endpoint, data);
	return await new UserController().postUserHandler(request);
};

const fetchApi = async (data: RegisterUserDTO) => {
	const body = JSON.stringify(data);
	return await FetchWrapper.post(endpoint, body);
};

export const register = async (data: RegisterUserDTO) => {
	return useLocalBackend ? await mockApi(data) : await fetchApi(data);
};
