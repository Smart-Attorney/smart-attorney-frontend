import { mockRequest } from "../../../lib/mock-request";
import { CasesController } from "../../../services/local-backend/cases/cases-controller";
import { DashboardCaseCardObj } from "../../../types/api";

export type UpdateCaseIsOpenDTO = Pick<DashboardCaseCardObj, "isOpen">;

const mockApi = async (caseId: string, data: UpdateCaseIsOpenDTO) => {
	const request = mockRequest.patch(`/dashboard/${caseId}`, data);
	return await new CasesController().updateIsOpenHandler(request);
};

export const updateCaseIsOpen = async (caseId: string, data: UpdateCaseIsOpenDTO) => {
	return await mockApi(caseId, data);
};
