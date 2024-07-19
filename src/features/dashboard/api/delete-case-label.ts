import { mockRequest } from "../../../lib/mock-request";
import { CaseLabelController } from "../../../services/local-backend/case-label/case-label-controller";

const mockApi = async (caseId: string, caseLabelId: string) => {
	const endpoint = `/users/cases/${caseId}/case-labels/${caseLabelId}`;
	const request = mockRequest.delete(endpoint);
	return await new CaseLabelController().deleteCaseLabelByIdHandler(request);
};

export const deleteCaseLabel = async (caseId: string, caseLabelId: string) => {
	return await mockApi(caseId, caseLabelId);
};
