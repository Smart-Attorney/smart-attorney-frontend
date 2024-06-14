import { mockRequest } from "../../../lib/mock-request";
import { CasesController } from "../../../services/local-backend/cases/cases-controller";

export type UpdateCaseFolderStatusDTO = boolean;

const mockApi = async (folderId: string, data: UpdateCaseFolderStatusDTO) => {
	const request = mockRequest.put(`/dashboard/${folderId}`, data);
	return await new CasesController().updateStatus(request);
};

export const updateStatus = async (folderId: string, data: UpdateCaseFolderStatusDTO) => {
	return await mockApi(folderId, data);
};
