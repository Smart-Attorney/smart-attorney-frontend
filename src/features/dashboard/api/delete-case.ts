import { mockRequest } from "../../../lib/mock-request";
import { CasesController } from "../../../services/local-backend/cases/cases-controller";

const mockApi = async (caseId: string) => {
	const endpoint = `/users/cases/${caseId}`;
	const request = mockRequest.delete(endpoint);
	return await new CasesController().deleteCaseHandler(request);
};

export const deleteCase = async (caseId: string) => {
	return await mockApi(caseId);
};
