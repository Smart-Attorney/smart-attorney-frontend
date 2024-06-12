import { mockRequest } from "../../../lib/mock-request";
import { CaseFolderController } from "../../../services/mock-backend/case-folder/case-folder-controller";

export type CreateFolderLabelDTO = string;

const mockApi = async (folderId: string, data: CreateFolderLabelDTO) => {
	const request = mockRequest.post(`/dashboard/${folderId}`, data);
	// return await FolderLabelController.createFolderLabel(request);
	return await CaseFolderController.createLabel(request);
};

export const createFolderLabel = async (folderId: string, data: CreateFolderLabelDTO) => {
	return await mockApi(folderId, data);
};
