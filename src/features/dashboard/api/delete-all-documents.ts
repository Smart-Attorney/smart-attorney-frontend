import { useLocalBackend } from "../../../config/use-local-backend";
import { FetchWrapper } from "../../../lib/fetch-wrapper";
import { MockRequest } from "../../../lib/mock-request";
import { DocumentController } from "../../../services/local-backend/document/document-controller";

const mockApi = async (caseId: string): Promise<Response> => {
	const endpoint = `/users/cases/${caseId}/documents`;
	const request = new MockRequest().delete(endpoint);
	return await new DocumentController().deleteAllDocumentsByCaseIdHandler(request);
};

const fetchApi = async (caseId: string): Promise<Response> => {
	const endpoint = `/users/cases/${caseId}/documents`;
	return await new FetchWrapper().delete(endpoint);
};

export const deleteAllDocumentsByCaseId = async (caseId: string): Promise<Response> => {
	return useLocalBackend ? await mockApi(caseId) : await fetchApi(caseId);
};
