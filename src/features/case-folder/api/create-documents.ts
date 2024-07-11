import { mockRequest } from "../../../lib/mock-request";
import { DocumentController } from "../../../services/local-backend/document/document-controller";

export type CreateCaseFilesDTO = FormData;

const mockApi = async (folderId: string, data: CreateCaseFilesDTO) => {
	const options = {
		method: "POST",
		headers: { Authorization: mockRequest.getToken() },
		body: data,
	};
	const request = new Request(`/case/${folderId}`, options);
	return await new DocumentController().createDocuments(request);
};

export const createDocuments = async (folderId: string, data: CreateCaseFilesDTO) => {
	return await mockApi(folderId, data);
};
