import { mockRequest } from "../../../lib/mock-request";
import { CasesController } from "../../../services/local-backend/cases/cases-controller";

const mockApi = async () => {
	const request = mockRequest.get(`/dashboard`);
	return await new CasesController().getAllCasesByUserId(request);
};

export const getUserCaseFolders = async () => {
	return await mockApi();
};
