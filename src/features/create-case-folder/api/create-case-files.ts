import { mockRequest } from "../../../lib/mock-request";
import { DocumentController } from "../../../services/local-backend/document/document-controller";

export type CreateCaseFilesDTO = FormData;

const mockApi = async (data: CreateCaseFilesDTO) => {
	const options = {
		method: "POST",
		headers: { Authorization: mockRequest.getToken() },
		body: data,
	};
	const request = new Request("/create-case", options);
	return await new DocumentController().createDocuments(request);
};

export const createCaseFiles = async (data: CreateCaseFilesDTO) => {
	return await mockApi(data);
};
