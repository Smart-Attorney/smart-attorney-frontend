import { mockRequest } from "../../../lib/mock-request";
import { CasesController } from "../../../services/local-backend/cases/cases-controller";
import { DashboardCaseCardObj } from "../../../types/api";

export type UpdateCaseNameDTO = Pick<DashboardCaseCardObj, "id" | "name">;

const mockApi = async (caseId: string, data: UpdateCaseNameDTO) => {
	const request = mockRequest.patch(`/case/${caseId}`, data);
	return await new CasesController().updateName(request);
};

export const updateCaseName = async (caseId: string, data: UpdateCaseNameDTO) => {
	return await mockApi(caseId, data);
};
