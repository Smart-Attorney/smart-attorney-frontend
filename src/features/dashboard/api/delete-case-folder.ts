import { mockRequest } from "../../../lib/mock-request";
import { CaseFolderController } from "../../../services/mock-backend/case-folder/case-folder-controller";

const mockApi = async (folderId: string) => {
	const request = mockRequest.delete(`/dashboard/${folderId}`);
	return await CaseFolderController.deleteCaseFolder(request);
};

export const deleteCaseFolder = async (folderId: string) => {
	return await mockApi(folderId);
};
