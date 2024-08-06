import { mockRequest } from "../../../lib/mock-request";
import { CaseLabelController } from "../../../services/local-backend/case-label/case-label-controller";

const mockApi = async (): Promise<Response> => {
	const endpoint = `/users/cases`;
	const request = mockRequest.get(endpoint);
	return await new CaseLabelController().getAllUserCaseLabelsHandler(request);
};

export const getCaseLabels = async (): Promise<Response> => {
	return await mockApi();
};
