import { mockRequest } from "../../../lib/mock-request";
import { CasesController } from "../../../services/local-backend/cases/cases-controller";

const mockApi = async (caseId: string, labelId: string) => {
	const request = mockRequest.delete(`/dashboard/${caseId}/${labelId}`);
	return await new CasesController().deleteCaseLabelHandler(request);
};

export const deleteCaseLabel = async (caseId: string, labelId: string) => {
	return await mockApi(caseId, labelId);
};
