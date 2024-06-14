import { mockRequest } from "../../../lib/mock-request";
import { CaseFolderController } from "../../../services/mock-backend/cases/case-folder-controller";

const mockApi = async (folderId: string) => {
	const request = mockRequest.get(`/case/${folderId}`);
	return await CaseFolderController.getCaseFolder(request);
};

export const getCaseFolder = async (folderId: string) => {
	return await mockApi(folderId);
};
