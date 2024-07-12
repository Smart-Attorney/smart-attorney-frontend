import { mockRequest } from "../../../lib/mock-request";
import { CasesController } from "../../../services/local-backend/cases/cases-controller";
import { DashboardCaseCardObj } from "../../../types/api";

export type UpdateCaseIsOpenDTO = Pick<DashboardCaseCardObj, "isOpen">;

const mockApi = async (folderId: string, data: UpdateCaseIsOpenDTO) => {
	const request = mockRequest.patch(`/dashboard/${folderId}`, data);
	return await new CasesController().updateIsOpen(request);
};

export const updateCaseIsOpen = async (folderId: string, data: UpdateCaseIsOpenDTO) => {
	return await mockApi(folderId, data);
};
