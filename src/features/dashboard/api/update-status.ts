import { mockRequest } from "../../../lib/mock-request";
import { CaseFolderController } from "../../../services/mock-backend/cases/case-folder-controller";

export type UpdateCaseFolderStatusDTO = boolean;

const mockApi = async (folderId: string, data: UpdateCaseFolderStatusDTO) => {
	const request = mockRequest.put(`/dashboard/${folderId}`, data);
	return await CaseFolderController.updateStatus(request);
};

export const updateStatus = async (folderId: string, data: UpdateCaseFolderStatusDTO) => {
	return await mockApi(folderId, data);
};
