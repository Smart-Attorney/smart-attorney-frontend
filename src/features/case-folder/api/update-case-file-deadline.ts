import { mockRequest } from "../../../lib/mock-request";
import { DocumentController } from "../../../services/local-backend/document/document-controller";

export type UpdateCaseFileDeadlineDTO = number;

const mockApi = async (folderId: string, fileId: string, newDeadline: number) => {
	const request = mockRequest.put(`/case/${folderId}/${fileId}`, newDeadline);
	return await new DocumentController().updateDocumentDeadline(request);
};

export const updateDeadline = async (folderId: string, fileId: string, newDeadline: number) => {
	return await mockApi(folderId, fileId, newDeadline);
};
