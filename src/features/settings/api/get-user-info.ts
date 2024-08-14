import { useLocalBackend } from "../../../config/use-local-backend";
import { FetchWrapper } from "../../../lib/fetch-wrapper";
import { MockRequest } from "../../../lib/mock-request";
import { UserController } from "../../../services/local-backend/user/user-controller";

const mockApi = async (): Promise<Response> => {
	const endpoint = `/users/settings/profile`;
	const request = new MockRequest().get(endpoint);
	return await new UserController().getUserHandler(request);
};

const fetchApi = async (): Promise<Response> => {
	const endpoint = `/users/settings/profile`;
	return await new FetchWrapper().get(endpoint);
};

export const getUserInfo = async (): Promise<Response> => {
	return useLocalBackend ? await mockApi() : await fetchApi();
};
