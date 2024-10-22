import { useLocalBackend } from "../../../config/use-local-backend";
import { FetchWrapper } from "../../../lib/fetch-wrapper";
import { MockRequest } from "../../../lib/mock-request";
import { DocumentController } from "../../../services/local-backend/document/document-controller";

const mockApi = async (caseId: string, documentId: string): Promise<Response> => {
	const endpoint = `/users/cases/${caseId}/documents/${documentId}`;
	const request = new MockRequest().get(endpoint);
	return await new DocumentController().getDocumentByIdHandler(request);
};

const fetchApi = async (caseId: string, documentId: string): Promise<Response> => {
	const endpoint = `/users/cases/${caseId}/documents/${documentId}`;
	return await new FetchWrapper().get(endpoint);
};

export const getDocument = async (caseId: string, documentId: string): Promise<Response> => {
	return useLocalBackend ? await mockApi(caseId, documentId) : await fetchApi(caseId, documentId);
};
