import { mockRequest } from "../../../lib/mock-request";
import { CaseFolderController } from "../../../services/mock-backend/controller/case-folder-controller";

const mockApi = async () => {
	const request = mockRequest.get(`/dashboard`);
	return await CaseFolderController.getAllCaseFolders(request);
};

export const getCaseFolders = async () => {
	return await mockApi();
};
