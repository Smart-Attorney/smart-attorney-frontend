import { mockRequest } from "../../../lib/mock-request";
import { CaseFolderController } from "../../../services/mock-backend/controller/case-folder-controller";

const mockApi = async (userId: string) => {
	const request = mockRequest.get(`/dashboard/${userId}`);
	return await CaseFolderController.getAllCaseFolders(request);
};

export const getCaseFolders = async (userId: string) => {
	return await mockApi(userId);
};
