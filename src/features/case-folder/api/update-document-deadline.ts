import { mockRequest } from "../../../lib/mock-request";
import { DocumentController } from "../../../services/local-backend/document/document-controller";
import { Document } from "../../../types/api";

export type UpdateDocumentDeadlineDTO = Pick<Document, "id" | "deadline">;

const mockApi = async (caseId: string, documentId: string, data: UpdateDocumentDeadlineDTO) => {
	const endpoint = `/users/cases/${caseId}/documents/${documentId}`;
	const request = mockRequest.patch(endpoint, data);
	return await new DocumentController().updateDocumentDeadlineHandler(request);
};

export const updateDocumentDeadline = async (caseId: string, documentId: string, data: UpdateDocumentDeadlineDTO) => {
	return await mockApi(caseId, documentId, data);
};
