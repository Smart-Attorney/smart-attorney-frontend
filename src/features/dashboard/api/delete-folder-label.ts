import { mockRequest } from "../../../lib/mock-request";
import { CasesController } from "../../../services/local-backend/cases/cases-controller";

const mockApi = async (folderId: string, labelId: string) => {
	const request = mockRequest.delete(`/dashboard/${folderId}/${labelId}`);
	return await new CasesController().deleteCaseLabel(request);
};

export const deleteFolderLabel = async (folderId: string, labelId: string) => {
	return await mockApi(folderId, labelId);
};
