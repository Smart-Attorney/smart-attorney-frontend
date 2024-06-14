import { mockRequest } from "../../../lib/mock-request";
import { CaseFolderController } from "../../../services/mock-backend/cases/case-folder-controller";

export type UpdateCaseFolderLastOpenedDateDTO = number;

const mockApi = async (folderId: string, date: UpdateCaseFolderLastOpenedDateDTO) => {
	const request = mockRequest.put(`/case/${folderId}`, date);
	return await CaseFolderController.updateLastOpenedDate(request);
};

export const updateLastOpenedDate = async (folderId: string, date: UpdateCaseFolderLastOpenedDateDTO) => {
	return await mockApi(folderId, date);
};
