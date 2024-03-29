import { mockRequest } from "../../../lib/mock-request";
import { UserController } from "../../../services/mock-backend/controller/user-controller";

const mockApi = async () => {
	const request = mockRequest.get("/settings");
	return await UserController.getUser(request);
};

export const getUserInfo = async () => {
	return await mockApi();
};
