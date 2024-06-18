import { mockRequest } from "../../../lib/mock-request";
import { CasesController } from "../../../services/local-backend/cases/cases-controller";

export type CreateFolderLabelDTO = string;

const mockApi = async (folderId: string, data: CreateFolderLabelDTO) => {
	const request = mockRequest.post(`/dashboard/${folderId}`, data);
	return await new CasesController().createLabel(request);
};

export const createFolderLabel = async (folderId: string, data: CreateFolderLabelDTO) => {
	return await mockApi(folderId, data);
};
