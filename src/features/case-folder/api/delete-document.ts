import { useLocalBackend } from "../../../config/use-local-backend";
import { FetchWrapper } from "../../../lib/fetch-wrapper";
import { MockRequest } from "../../../lib/mock-request";
import { DocumentController } from "../../../services/local-backend/document/document-controller";

const mockApi = async (caseId: string, documentId: string): Promise<Response> => {
	const endpoint = `/users/cases/${caseId}/documents/${documentId}`;
	const request = new MockRequest().delete(endpoint);
	return await new DocumentController().deleteDocumentByIdHandler(request);
};

const fetchApi = async (caseId: string, documentId: string): Promise<Response> => {
	const endpoint = `/users/cases/${caseId}/documents/${documentId}`;
	return await new FetchWrapper().delete(endpoint);
};

export const deleteDocument = async (caseId: string, documentId: string): Promise<Response> => {
	return useLocalBackend ? await mockApi(caseId, documentId) : await fetchApi(caseId, documentId);
};
