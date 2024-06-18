import { useLocalBackend } from "../../../config/use-local-backend";
import { fetchWrapper } from "../../../lib/fetch-wrapper";
import { mockRequest } from "../../../lib/mock-request";
import { UserController } from "../../../services/local-backend/user/user-controller";

export interface SignInCredentialsDTO {
	companyEmail: string;
	password: string;
}

const mockApi = async (data: SignInCredentialsDTO) => {
	const request = mockRequest.post("/signin", data);
	return await new UserController().verifyUser(request);
};

const fetchApi = async (data: SignInCredentialsDTO) => {
	const url = "http://localhost:8080/signin";
	return await fetchWrapper.post(url, data);
};

export const signInWithEmailAndPassword = async (data: SignInCredentialsDTO) => {
	return useLocalBackend ? await mockApi(data) : await fetchApi(data);
};
