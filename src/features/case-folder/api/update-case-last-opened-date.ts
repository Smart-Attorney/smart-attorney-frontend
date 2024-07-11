import { mockRequest } from "../../../lib/mock-request";
import { CasesController } from "../../../services/local-backend/cases/cases-controller";

export type UpdateCaseFolderLastOpenedDateDTO = number;

const mockApi = async (folderId: string, date: UpdateCaseFolderLastOpenedDateDTO) => {
	const request = mockRequest.put(`/case/${folderId}`, date);
	return await new CasesController().updateLastOpenedDate(request);
};

export const updateLastOpenedDate = async (folderId: string, date: UpdateCaseFolderLastOpenedDateDTO) => {
	return await mockApi(folderId, date);
};
