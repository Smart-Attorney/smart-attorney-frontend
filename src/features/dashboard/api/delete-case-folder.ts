import { mockRequest } from "../../../lib/mock-request";
import { CasesController } from "../../../services/local-backend/cases/cases-controller";

const mockApi = async (folderId: string) => {
	const request = mockRequest.delete(`/dashboard/${folderId}`);
	return await new CasesController().deleteCaseFolder(request);
};

export const deleteCaseFolder = async (folderId: string) => {
	return await mockApi(folderId);
};
