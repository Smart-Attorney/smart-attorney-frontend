import { mockRequest } from "../../../lib/mock-request";
import { DocumentController } from "../../../services/local-backend/document/document-controller";
import { DocumentObj } from "../../../types/api";

export type UpdateDocumentDeadlineDTO = Pick<DocumentObj, "id" | "deadline">;

const mockApi = async (caseId: string, documentId: string, data: UpdateDocumentDeadlineDTO) => {
	const request = mockRequest.patch(`/case/${caseId}/${documentId}`, data);
	return await new DocumentController().updateDocumentDeadline(request);
};

export const updateDocumentDeadline = async (caseId: string, documentId: string, data: UpdateDocumentDeadlineDTO) => {
	return await mockApi(caseId, documentId, data);
};
