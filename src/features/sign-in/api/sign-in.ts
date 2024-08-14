import { useLocalBackend } from "../../../config/use-local-backend";
import { FetchWrapper } from "../../../lib/fetch-wrapper";
import { MockRequest } from "../../../lib/mock-request";
import { UserController } from "../../../services/local-backend/user/user-controller";
import { User } from "../../../types/api";

export type SignInUserDTO = Pick<User, "companyEmail" | "password">;

const mockApi = async (data: SignInUserDTO): Promise<Response> => {
	const endpoint = `/auth/signin`;
	const body = JSON.stringify(data);
	const request = new MockRequest().post(endpoint, body);
	return await new UserController().verifyUserHandler(request);
};

const fetchApi = async (data: SignInUserDTO): Promise<Response> => {
	const endpoint = `/auth/signin`;
	const body = JSON.stringify(data);
	return await new FetchWrapper().post(endpoint, body);
};

export const signIn = async (data: SignInUserDTO): Promise<Response> => {
	return useLocalBackend ? await mockApi(data) : await fetchApi(data);
};
