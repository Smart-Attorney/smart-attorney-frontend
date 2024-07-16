import { mockRequest } from "../../../lib/mock-request";
import { DocumentController } from "../../../services/local-backend/document/document-controller";
import { CreateDocumentsDTO } from "../../case-folder/api/create-documents";

const mockApi = async (data: CreateDocumentsDTO) => {
	const options = {
		method: "POST",
		headers: { Authorization: mockRequest.getToken() },
		body: data,
	};
	const request = new Request("/create-case", options);
	return await new DocumentController().postDocumentsHandler(request);
};

export const createDocuments = async (data: CreateDocumentsDTO) => {
	return await mockApi(data);
};
