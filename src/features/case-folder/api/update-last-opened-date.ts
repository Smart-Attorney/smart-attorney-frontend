import { mockRequest } from "../../../lib/mock-request";
import { CaseFolderController } from "../../../services/mock-backend/controller/case-folder-controller";

const mockApi = async (folderId: string, date: number) => {
	const request = mockRequest.put(`/case/${folderId}`, date);
	return await CaseFolderController.updateLastOpenedDate(request);
};

export const updateLastOpenedDate = async (folderId: string, date: number) => {
	return await mockApi(folderId, date);
};
