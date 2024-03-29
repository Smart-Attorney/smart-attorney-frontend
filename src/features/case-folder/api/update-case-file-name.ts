import { mockRequest } from "../../../lib/mock-request";
import { CaseFileController } from "../../../services/mock-backend/controller/case-file-controller";

export type UpdateCaseFileNameDTO = string;

const mockApi = async (folderId: string, fileId: string, newFileName: UpdateCaseFileNameDTO) => {
	const request = mockRequest.put(`/case/${folderId}/${fileId}`, newFileName);
	return await CaseFileController.updateFileName(request);
};

export const updateCaseFileName = async (folderId: string, fileId: string, newFileName: UpdateCaseFileNameDTO) => {
	return await mockApi(folderId, fileId, newFileName);
};
