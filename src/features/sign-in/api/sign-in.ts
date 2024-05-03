import { useMock } from "../../../config/use-mock";
import { fetchWrapper } from "../../../lib/fetch-wrapper";
import { mockRequest } from "../../../lib/mock-request";
import { UserController } from "../../../services/mock-backend/controller/user-controller";

export interface SignInCredentialsDTO {
	companyEmail: string;
	password: string;
}

const mockApi = async (data: SignInCredentialsDTO) => {
	const request = mockRequest.post("/signin", data);
	return await UserController.verifyUser(request);
};

const fetchApi = async (data: SignInCredentialsDTO) => {
	const url = "http://localhost:8080/signin";
	return await fetchWrapper.post(url, data);
};

export const signInWithEmailAndPassword = async (data: SignInCredentialsDTO) => {
	return useMock ? await mockApi(data) : await fetchApi(data);
};
