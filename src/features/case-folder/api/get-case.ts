import { mockRequest } from "../../../lib/mock-request";
import { CasesController } from "../../../services/local-backend/cases/cases-controller";

const mockApi = async (caseId: string) => {
	const request = mockRequest.get(`/case/${caseId}`);
	return await new CasesController().getCaseByIdHandler(request);
};

export const getCase = async (caseId: string) => {
	return await mockApi(caseId);
};
