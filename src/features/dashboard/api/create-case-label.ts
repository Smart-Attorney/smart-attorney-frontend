import { mockRequest } from "../../../lib/mock-request";
import { CasesController } from "../../../services/local-backend/cases/cases-controller";
import { CaseLabelObj } from "../../../types/api";

export type CreateCaseLabelDTO = Pick<CaseLabelObj, "name">;

const mockApi = async (caseId: string, data: CreateCaseLabelDTO) => {
	const request = mockRequest.post(`/dashboard/${caseId}`, data);
	return await new CasesController().postCaseLabelHandler(request);
};

export const createCaseLabel = async (caseId: string, data: CreateCaseLabelDTO) => {
	return await mockApi(caseId, data);
};
