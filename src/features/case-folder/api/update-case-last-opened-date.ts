import { mockRequest } from "../../../lib/mock-request";
import { CasesController } from "../../../services/local-backend/cases/cases-controller";
import { DashboardCaseCardObj } from "../../../types/api";

export type UpdateCaseLastOpenedDateDTO = Pick<DashboardCaseCardObj, "id">;

const mockApi = async (caseId: string, data: UpdateCaseLastOpenedDateDTO) => {
	const endpoint = `/users/cases/${caseId}`;
	const request = mockRequest.patch(endpoint, data);
	return await new CasesController().updateLastOpenedDateHandler(request);
};

export const updateCaseLastOpenedDate = async (caseId: string, data: UpdateCaseLastOpenedDateDTO) => {
	return await mockApi(caseId, data);
};
