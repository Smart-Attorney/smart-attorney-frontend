import { mockRequest } from "../../../lib/mock-request";
import { CasesController } from "../../../services/local-backend/cases/cases-controller";

export interface CreateCaseFolderDTO {
	folderId: string;
	folderName: string;
}

const mockApi = async (data: CreateCaseFolderDTO) => {
	const request = mockRequest.post("/create-case", data);
	return await new CasesController().createCase(request);
};

export const createCaseFolder = async (data: CreateCaseFolderDTO) => {
	return await mockApi(data);
};
