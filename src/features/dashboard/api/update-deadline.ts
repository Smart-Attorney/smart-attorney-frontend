import { mockRequest } from "../../../lib/mock-request";
import { CaseFolderController } from "../../../services/mock-backend/case-folder/case-folder-controller";

export type UpdateCaseFolderDeadlineDTO = number;

const mockApi = async (folderId: string, data: UpdateCaseFolderDeadlineDTO) => {
	const request = mockRequest.put(`/dashboard/${folderId}`, data);
	return await CaseFolderController.updateDeadline(request);
};

export const updateDeadline = async (folderId: string, data: UpdateCaseFolderDeadlineDTO) => {
	return await mockApi(folderId, data);
};
