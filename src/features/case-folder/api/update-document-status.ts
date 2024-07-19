import { mockRequest } from "../../../lib/mock-request";
import { DocumentController } from "../../../services/local-backend/document/document-controller";
import { DocumentObj } from "../../../types/api";

export type UpdateDocumentStatusDTO = Pick<DocumentObj, "id" | "status">;

const mockApi = async (caseId: string, documentId: string, data: UpdateDocumentStatusDTO) => {
	const endpoint = `/users/cases/${caseId}/documents/${documentId}`;
	const request = mockRequest.patch(endpoint, data);
	return await new DocumentController().updateDocumentStatusHandler(request);
};

export const updateDocumentStatus = async (caseId: string, documentId: string, data: UpdateDocumentStatusDTO) => {
	return await mockApi(caseId, documentId, data);
};
