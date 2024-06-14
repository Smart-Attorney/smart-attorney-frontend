import { mockRequest } from "../../../lib/mock-request";
import { CaseLabelController } from "../../../services/local-backend/case-label/case-label-controller";

const mockApi = async (): Promise<Response> => {
	const request = mockRequest.get(`/dashboard`);
	return await new CaseLabelController().getAllUserCaseLabels(request);
};

export const getCaseLabels = async (): Promise<Response> => {
	return await mockApi();
};
