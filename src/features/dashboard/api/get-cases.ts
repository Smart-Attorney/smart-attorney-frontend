import { mockRequest } from "../../../lib/mock-request";
import { CasesController } from "../../../services/local-backend/cases/cases-controller";

const mockApi = async () => {
	const request = mockRequest.get(`/dashboard`);
	return await new CasesController().getAllCasesByUserIdHandler(request);
};

export const getCases = async () => {
	return await mockApi();
};
