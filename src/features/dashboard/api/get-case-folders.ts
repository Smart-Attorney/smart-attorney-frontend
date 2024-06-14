import { mockRequest } from "../../../lib/mock-request";
import { CaseFolderController } from "../../../services/mock-backend/cases/case-folder-controller";

const mockApi = async () => {
	const request = mockRequest.get(`/dashboard`);
	return await CaseFolderController.getUserCaseFolders(request);
};

export const getUserCaseFolders = async () => {
	return await mockApi();
};
