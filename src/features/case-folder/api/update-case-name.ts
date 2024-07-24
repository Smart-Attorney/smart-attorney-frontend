import { mockRequest } from "../../../lib/mock-request";
import { CasesController } from "../../../services/local-backend/cases/cases-controller";
import { Case } from "../../../types/api";

export type UpdateCaseNameDTO = Pick<Case, "id" | "name">;

const mockApi = async (caseId: string, data: UpdateCaseNameDTO) => {
	const endpoint = `/users/cases/${caseId}`;
	const request = mockRequest.patch(endpoint, data);
	return await new CasesController().updateNameHandler(request);
};

export const updateCaseName = async (caseId: string, data: UpdateCaseNameDTO) => {
	return await mockApi(caseId, data);
};
