import { useLocalBackend } from "../../../config/use-local-backend";
import { FetchWrapper } from "../../../lib/fetch-wrapper";
import { MockRequest } from "../../../lib/mock-request";
import { DocumentController } from "../../../services/local-backend/document/document-controller";

export type CreateDocumentsDTO = FormData;

const mockApi = async (caseId: string, data: CreateDocumentsDTO): Promise<Response> => {
	const endpoint = `/users/cases/${caseId}/documents`;
	const body = data; // FormData, JSON.stringify(FormData) == {}
	const request = new MockRequest().post(endpoint, body);
	return await new DocumentController().postDocumentsHandler(request);
};

const fetchApi = async (caseId: string, data: CreateDocumentsDTO): Promise<Response> => {
	const endpoint = `/users/cases/${caseId}/documents`;
	const body = data;
	return await new FetchWrapper().post(endpoint, body);
};

export const createDocuments = async (caseId: string, data: CreateDocumentsDTO): Promise<Response> => {
	return useLocalBackend ? await mockApi(caseId, data) : await fetchApi(caseId, data);
};
