import { useLocalBackend } from "../../../config/use-local-backend";
import { fetchWrapper } from "../../../lib/fetch-wrapper";
import { mockRequest } from "../../../lib/mock-request";
import { UserController } from "../../../services/local-backend/user/user-controller";
import { UserObj } from "../../../types/api";

export type RegisterUserDTO = Omit<UserObj, "id" | "email">;

const mockApi = async (data: RegisterUserDTO) => {
	const request = mockRequest.post("/", data);
	return await new UserController().registerUser(request);
};

const fetchApi = async (data: RegisterUserDTO) => {
	const url = "http://localhost:8080/register";
	return await fetchWrapper.post(url, data);
};

export const registerNewUser = async (data: RegisterUserDTO) => {
	return useLocalBackend ? await mockApi(data) : await fetchApi(data);
};
