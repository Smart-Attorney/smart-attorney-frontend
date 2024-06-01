import { mockRequest } from "../../../lib/mock-request";
import { FolderLabelController } from "../../../services/mock-backend/case-folder-label/folder-label-controller";

export type CreateFolderLabelDTO = string;

const mockApi = async (folderId: string, data: CreateFolderLabelDTO) => {
	const request = mockRequest.post(`/dashboard/${folderId}`, data);
	return await FolderLabelController.createFolderLabel(request);
};

export const createFolderLabel = async (folderId: string, data: CreateFolderLabelDTO) => {
	return await mockApi(folderId, data);
};
