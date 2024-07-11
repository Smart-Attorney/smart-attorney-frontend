import { mockRequest } from "../../../lib/mock-request";
import { DocumentController } from "../../../services/local-backend/document/document-controller";

const mockApi = async (caseId: string, documentId: string) => {
	const request = mockRequest.delete(`/case/${caseId}/${documentId}`);
	return await new DocumentController().deleteDocumentById(request);
};

export const deleteDocument = async (caseId: string, documentId: string) => {
	return await mockApi(caseId, documentId);
};
