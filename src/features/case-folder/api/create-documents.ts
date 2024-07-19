import { mockRequest } from "../../../lib/mock-request";
import { DocumentController } from "../../../services/local-backend/document/document-controller";

export type CreateDocumentsDTO = FormData;

const mockApi = async (caseId: string, data: CreateDocumentsDTO) => {
	const options = {
		method: "POST",
		headers: { Authorization: mockRequest.getToken() },
		body: data,
	};
	const endpoint = `/users/cases/${caseId}/documents`;
	const request = new Request(endpoint, options);
	// JSON.stringify(FormData) == {};
	return await new DocumentController().postDocumentsHandler(request);
};

export const createDocuments = async (caseId: string, data: CreateDocumentsDTO) => {
	return await mockApi(caseId, data);
};
