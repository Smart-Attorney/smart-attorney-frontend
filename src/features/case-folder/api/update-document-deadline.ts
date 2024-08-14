import { useLocalBackend } from "../../../config/use-local-backend";
import { FetchWrapper } from "../../../lib/fetch-wrapper";
import { MockRequest } from "../../../lib/mock-request";
import { DocumentController } from "../../../services/local-backend/document/document-controller";
import { Document } from "../../../types/api";

export type UpdateDocumentDeadlineDTO = Pick<Document, "id" | "deadline">;

const mockApi = async (caseId: string, documentId: string, data: UpdateDocumentDeadlineDTO): Promise<Response> => {
	const endpoint = `/users/cases/${caseId}/documents/${documentId}`;
	const body = JSON.stringify(data);
	const request = new MockRequest().patch(endpoint, body);
	return await new DocumentController().updateDocumentDeadlineHandler(request);
};

const fetchApi = async (caseId: string, documentId: string, data: UpdateDocumentDeadlineDTO): Promise<Response> => {
	const endpoint = `/users/cases/${caseId}/documents/${documentId}`;
	const body = JSON.stringify(data);
	return await new FetchWrapper().patch(endpoint, body);
};

export const updateDocumentDeadline = async (
	caseId: string,
	documentId: string,
	data: UpdateDocumentDeadlineDTO
): Promise<Response> => {
	return useLocalBackend ? await mockApi(caseId, documentId, data) : await fetchApi(caseId, documentId, data);
};
