import { mockRequest } from "../../../lib/mock-request";
import { CaseLabelController } from "../../../services/local-backend/case-label/case-label-controller";

const mockApi = async (caseId: string, labelId: string) => {
	const request = mockRequest.delete(`/dashboard/${caseId}/${labelId}`);
	return await new CaseLabelController().deleteCaseLabelByIdHandler(request);
};

export const deleteCaseLabel = async (caseId: string, labelId: string) => {
	return await mockApi(caseId, labelId);
};
