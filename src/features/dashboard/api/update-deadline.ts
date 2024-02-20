import { mockRequest } from "../../../lib/mock-request";
import { CaseFolderController } from "../../../services/mock-backend/controller/case-folder-controller";

export type UpdateDeadlineDTO = number;

const mockApi = async (folderId: string, data: UpdateDeadlineDTO) => {
	const request = mockRequest.put(`/dashboard/${folderId}`, data);
	return await CaseFolderController.updateCaseFolderDeadline(request);
};

export const updateDeadline = async (folderId: string, data: UpdateDeadlineDTO) => {
	return await mockApi(folderId, data);
};
