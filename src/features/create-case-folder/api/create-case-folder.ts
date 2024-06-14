import { mockRequest } from "../../../lib/mock-request";
import { CaseFolderController } from "../../../services/mock-backend/cases/case-folder-controller";

export interface CreateCaseFolderDTO {
	folderId: string;
	folderName: string;
}

const mockApi = async (data: CreateCaseFolderDTO) => {
	const request = mockRequest.post("/create-case", data);
	return await CaseFolderController.createCaseFolder(request);
};

export const createCaseFolder = async (data: CreateCaseFolderDTO) => {
	return await mockApi(data);
};
