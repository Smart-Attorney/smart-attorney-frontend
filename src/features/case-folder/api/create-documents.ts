import { mockRequest } from "../../../lib/mock-request";
import { DocumentController } from "../../../services/local-backend/document/document-controller";

export type CreateDocumentsDTO = FormData;

const mockApi = async (caseId: string, data: CreateDocumentsDTO) => {
	const options = {
		method: "POST",
		headers: { Authorization: mockRequest.getToken() },
		body: data,
	};
	const request = new Request(`/case/${caseId}`, options);
	return await new DocumentController().createDocuments(request);
};

export const createDocuments = async (caseId: string, data: CreateDocumentsDTO) => {
	return await mockApi(caseId, data);
};
