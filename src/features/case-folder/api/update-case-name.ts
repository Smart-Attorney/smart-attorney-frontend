import { useLocalBackend } from "../../../config/use-local-backend";
import { FetchWrapper } from "../../../lib/fetch-wrapper";
import { MockRequest } from "../../../lib/mock-request";
import { CasesController } from "../../../services/local-backend/cases/cases-controller";
import { Case } from "../../../types/api";

export type UpdateCaseNameDTO = Pick<Case, "id" | "name">;

const mockApi = async (caseId: string, data: UpdateCaseNameDTO): Promise<Response> => {
	const endpoint = `/users/cases/${caseId}`;
	const body = JSON.stringify(data);
	const request = new MockRequest().patch(endpoint, body);
	return await new CasesController().updateNameHandler(request);
};

const fetchApi = async (caseId: string, data: UpdateCaseNameDTO): Promise<Response> => {
	const endpoint = `/users/cases/${caseId}`;
	const body = JSON.stringify(data);
	return await new FetchWrapper().patch(endpoint, body);
};

export const updateCaseName = async (caseId: string, data: UpdateCaseNameDTO): Promise<Response> => {
	return useLocalBackend ? await mockApi(caseId, data) : await fetchApi(caseId, data);
};
