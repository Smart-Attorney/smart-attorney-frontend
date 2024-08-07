import { mockRequest } from "../../../lib/mock-request";
import { UserController } from "../../../services/local-backend/user/user-controller";

const mockApi = async () => {
	const endpoint = `/users/settings/profile`;
	const request = mockRequest.get(endpoint);
	return await new UserController().getUserHandler(request);
};

export const getUserInfo = async () => {
	return await mockApi();
};
