import { mockRequest } from "../../../lib/mock-request";
import { CaseLabelController } from "../../../services/local-backend/case-label/case-label-controller";
import { CaseLabelObj } from "../../../types/api";

export type CreateCaseLabelDTO = Pick<CaseLabelObj, "name">;

const mockApi = async (caseId: string, data: CreateCaseLabelDTO) => {
	const endpoint = `/users/cases/${caseId}/case-labels`;
	const request = mockRequest.post(endpoint, data);
	return await new CaseLabelController().postCaseLabelHandler(request);
};

export const createCaseLabel = async (caseId: string, data: CreateCaseLabelDTO) => {
	return await mockApi(caseId, data);
};
