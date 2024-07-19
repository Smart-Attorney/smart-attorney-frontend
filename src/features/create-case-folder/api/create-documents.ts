import { mockRequest } from "../../../lib/mock-request";
import { DocumentController } from "../../../services/local-backend/document/document-controller";
import { CreateDocumentsDTO } from "../../case-folder/api/create-documents";

const mockApi = async (caseId: string, data: CreateDocumentsDTO) => {
	const options = {
		method: "POST",
		headers: { Authorization: mockRequest.getToken() },
		body: data,
	};
	const endpoint = `/users/cases/${caseId}/documents`;
	const request = new Request(endpoint, options);
	return await new DocumentController().postDocumentsHandler(request);
};

export const createDocuments = async (caseId: string, data: CreateDocumentsDTO) => {
	return await mockApi(caseId, data);
};
