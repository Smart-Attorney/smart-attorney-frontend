import { mockRequest } from "../../../lib/mock-request";
import { DocumentController } from "../../../services/local-backend/document/document-controller";

const mockApi = async (caseId: string, documentId: string) => {
	const endpoint = `/users/cases/${caseId}/documents/${documentId}`;
	const request = mockRequest.get(endpoint);
	return await new DocumentController().getDocumentByIdHandler(request);
};

export const getDocument = async (caseId: string, documentId: string) => {
	return await mockApi(caseId, documentId);
};
