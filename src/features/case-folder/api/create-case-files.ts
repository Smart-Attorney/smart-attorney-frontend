import { mockRequest } from "../../../lib/mock-request";
import { CaseFileController } from "../../../services/local-backend/document/case-file-controller";

export type CreateCaseFilesDTO = FormData;

const mockApi = async (folderId: string, data: CreateCaseFilesDTO) => {
	const options = {
		method: "POST",
		headers: { Authorization: mockRequest.getToken() },
		body: data,
	};
	const request = new Request(`/case/${folderId}`, options);
	return await CaseFileController.createCaseFiles(request);
};

export const createCaseFiles = async (folderId: string, data: CreateCaseFilesDTO) => {
	return await mockApi(folderId, data);
};
