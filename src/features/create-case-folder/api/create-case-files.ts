import { mockRequest } from "../../../lib/mock-request";
import { CaseFileController } from "../../../services/mock-backend/controller/case-file-controller";

export type CreateCaseFilesDTO = FormData;

const mockApi = async (data: CreateCaseFilesDTO) => {
	const options = {
		method: "POST",
		headers: { Authorization: mockRequest.getToken() },
		body: data,
	};
	const request = new Request("/create-case", options);
	return await CaseFileController.createCaseFiles(request);
};

export const createCaseFiles = async (data: CreateCaseFilesDTO) => {
	return await mockApi(data);
};
