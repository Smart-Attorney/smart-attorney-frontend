import { mockRequest } from "../../../lib/mock-request";
import { CaseFolderController } from "../../../services/mock-backend/controller/case-folder-controller";

const mockApi = async (data: any) => {
	const request = mockRequest.post("/create-case", data);
	return await CaseFolderController.createCaseFolder(request);
};

export const createCaseFolder = async (data: any) => {
	return await mockApi(data);
};
