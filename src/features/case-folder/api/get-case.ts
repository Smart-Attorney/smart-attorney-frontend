import { mockRequest } from "../../../lib/mock-request";
import { CasesController } from "../../../services/local-backend/cases/cases-controller";

const mockApi = async (caseId: string) => {
	const endpoint = `/users/cases/${caseId}`;
	const request = mockRequest.get(endpoint);
	return await new CasesController().getCaseByIdHandler(request);
};

export const getCase = async (caseId: string) => {
	return await mockApi(caseId);
};
