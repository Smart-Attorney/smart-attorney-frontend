import { mockRequest } from "../../../lib/mock-request";
import { DocumentController } from "../../../services/local-backend/document/document-controller";

export type UpdateCaseFileNameDTO = string;

const mockApi = async (folderId: string, fileId: string, newFileName: UpdateCaseFileNameDTO) => {
	const request = mockRequest.put(`/case/${folderId}/${fileId}`, newFileName);
	return await new DocumentController().updateDocumentName(request);
};

export const updateCaseFileName = async (folderId: string, fileId: string, newFileName: UpdateCaseFileNameDTO) => {
	return await mockApi(folderId, fileId, newFileName);
};
