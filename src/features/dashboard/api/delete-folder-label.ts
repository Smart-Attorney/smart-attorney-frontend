import { mockRequest } from "../../../lib/mock-request";
import { CaseFolderController } from "../../../services/mock-backend/case-folder/case-folder-controller";

const mockApi = async (folderId: string, labelId: string) => {
	const request = mockRequest.delete(`/dashboard/${folderId}/${labelId}`);
	return await CaseFolderController.deleteCaseLabel(request);
};

export const deleteFolderLabel = async (folderId: string, labelId: string) => {
	return await mockApi(folderId, labelId);
};
