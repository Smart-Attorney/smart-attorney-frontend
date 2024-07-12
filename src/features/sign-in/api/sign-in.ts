import { useLocalBackend } from "../../../config/use-local-backend";
import { fetchWrapper } from "../../../lib/fetch-wrapper";
import { mockRequest } from "../../../lib/mock-request";
import { UserController } from "../../../services/local-backend/user/user-controller";
import { UserObj } from "../../../types/api";

export type SignInUserDTO = Pick<UserObj, "companyEmail" | "password">;

const mockApi = async (data: SignInUserDTO) => {
	const request = mockRequest.post("/signin", data);
	return await new UserController().verifyUser(request);
};

const fetchApi = async (data: SignInUserDTO) => {
	const url = "http://localhost:8080/signin";
	return await fetchWrapper.post(url, data);
};

export const signIn = async (data: SignInUserDTO) => {
	return useLocalBackend ? await mockApi(data) : await fetchApi(data);
};
