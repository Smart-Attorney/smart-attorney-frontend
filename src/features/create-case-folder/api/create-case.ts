import { mockRequest } from "../../../lib/mock-request";
import { CasesController } from "../../../services/local-backend/cases/cases-controller";
import { DashboardCaseCardObj } from "../../../types/api";

export type CreateCaseDTO = Pick<DashboardCaseCardObj, "name">;

const mockApi = async (data: CreateCaseDTO) => {
	const endpoint = `/users/cases`;
	const request = mockRequest.post(endpoint, data);
	return await new CasesController().postCaseHandler(request);
};

export const createCase = async (data: CreateCaseDTO) => {
	return await mockApi(data);
};
