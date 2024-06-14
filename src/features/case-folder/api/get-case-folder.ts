import { mockRequest } from "../../../lib/mock-request";
import { CasesController } from "../../../services/local-backend/cases/cases-controller";

const mockApi = async (folderId: string) => {
	const request = mockRequest.get(`/case/${folderId}`);
	return await new CasesController().getCaseById(request);
};

export const getCaseFolder = async (folderId: string) => {
	return await mockApi(folderId);
};
