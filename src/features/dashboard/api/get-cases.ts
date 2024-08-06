import { mockRequest } from "../../../lib/mock-request";
import { CasesController } from "../../../services/local-backend/cases/cases-controller";

const mockApi = async () => {
	const endpoint = `/users/cases`;
	const request = mockRequest.get(endpoint);
	return await new CasesController().getAllCasesByUserIdHandler(request);
};

export const getCases = async () => {
	return await mockApi();
};
