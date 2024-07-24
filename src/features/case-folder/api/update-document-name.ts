import { mockRequest } from "../../../lib/mock-request";
import { DocumentController } from "../../../services/local-backend/document/document-controller";
import { Document } from "../../../types/api";

export type UpdateDocumentNameDTO = Pick<Document, "id" | "name">;

const mockApi = async (caseId: string, documentId: string, data: UpdateDocumentNameDTO) => {
	const endpoint = `/users/cases/${caseId}/documents/${documentId}`;
	const request = mockRequest.patch(endpoint, data);
	return await new DocumentController().updateDocumentNameHandler(request);
};

export const updateDocumentName = async (caseId: string, documentId: string, data: UpdateDocumentNameDTO) => {
	return await mockApi(caseId, documentId, data);
};
