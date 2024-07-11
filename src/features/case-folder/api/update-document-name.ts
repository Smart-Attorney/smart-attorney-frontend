import { mockRequest } from "../../../lib/mock-request";
import { DocumentController } from "../../../services/local-backend/document/document-controller";
import { DocumentObj } from "../../../types/api";

export type UpdateDocumentNameDTO = Pick<DocumentObj, "id" | "name">;

const mockApi = async (caseId: string, documentId: string, data: UpdateDocumentNameDTO) => {
	const request = mockRequest.patch(`/case/${caseId}/${documentId}`, data);
	return await new DocumentController().updateDocumentName(request);
};

export const updateDocumentName = async (caseId: string, documentId: string, data: UpdateDocumentNameDTO) => {
	return await mockApi(caseId, documentId, data);
};
