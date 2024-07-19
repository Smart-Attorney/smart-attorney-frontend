import { useLocalBackend } from "../../../config/use-local-backend";
import { fetchWrapper } from "../../../lib/fetch-wrapper";
import { mockRequest } from "../../../lib/mock-request";
import { UserController } from "../../../services/local-backend/user/user-controller";
import { UserObj } from "../../../types/api";

export type SignInUserDTO = Pick<UserObj, "companyEmail" | "password">;

const baseUrl = "http://localhost:8080";
const endpoint = "/auth/signin";

const mockApi = async (data: SignInUserDTO) => {
	const request = mockRequest.post(endpoint, data);
	return await new UserController().verifyUserHandler(request);
};

const fetchApi = async (data: SignInUserDTO) => {
	const absoluteUrl = baseUrl + endpoint;
	return await fetchWrapper.post(absoluteUrl, data);
};

export const signIn = async (data: SignInUserDTO) => {
	return useLocalBackend ? await mockApi(data) : await fetchApi(data);
};
