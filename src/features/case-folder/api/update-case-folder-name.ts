import { mockRequest } from "../../../lib/mock-request";
import { CaseFolderController } from "../../../services/mock-backend/case-folder/case-folder-controller";

export type UpdateCaseFolderNameDTO = string;

const mockApi = async (folderId: string, newFolderName: UpdateCaseFolderNameDTO) => {
	const request = mockRequest.put(`/case/${folderId}`, newFolderName);
	return await CaseFolderController.updateName(request);
};

export const updateCaseFolderName = async (folderId: string, newFolderName: UpdateCaseFolderNameDTO) => {
	return await mockApi(folderId, newFolderName);
};
