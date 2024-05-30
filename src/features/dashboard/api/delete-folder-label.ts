import { mockRequest } from "../../../lib/mock-request";
import { FolderLabelController } from "../../../services/mock-backend/case-folder-label/folder-label-controller";

const mockApi = async (folderId: string, labelId: string) => {
	const request = mockRequest.delete(`/dashboard/${folderId}/${labelId}`);
	return await FolderLabelController.deleteFolderLabel(request);
};

export const deleteFolderLabel = async (folderId: string, labelId: string) => {
	return await mockApi(folderId, labelId);
};
