import { mockRequest } from "../../../lib/mock-request";
import { CaseFolderController } from "../../../services/mock-backend/case-folder/case-folder-controller";

const mockApi = async () => {
	const request = mockRequest.get(`/dashboard`);
	return await CaseFolderController.getUserCaseFolders(request);
};

export const getUserCaseFolders = async () => {
	return await mockApi();
};
