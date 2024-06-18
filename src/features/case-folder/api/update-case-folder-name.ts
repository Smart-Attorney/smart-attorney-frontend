import { mockRequest } from "../../../lib/mock-request";
import { CasesController } from "../../../services/local-backend/cases/cases-controller";

export type UpdateCaseFolderNameDTO = string;

const mockApi = async (folderId: string, newFolderName: UpdateCaseFolderNameDTO) => {
	const request = mockRequest.put(`/case/${folderId}`, newFolderName);
	return await new CasesController().updateName(request);
};

export const updateCaseFolderName = async (folderId: string, newFolderName: UpdateCaseFolderNameDTO) => {
	return await mockApi(folderId, newFolderName);
};
