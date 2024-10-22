import { useLocalBackend } from "../../../config/use-local-backend";
import { FetchWrapper } from "../../../lib/fetch-wrapper";
import { MockRequest } from "../../../lib/mock-request";
import { CaseLabelController } from "../../../services/local-backend/case-label/case-label-controller";
import { CaseLabel } from "../../../types/api";

export type CreateCaseLabelDTO = Pick<CaseLabel, "name">;

const mockApi = async (caseId: string, data: CreateCaseLabelDTO): Promise<Response> => {
	const endpoint = `/users/cases/${caseId}/case-labels`;
	const body = JSON.stringify(data);
	const request = new MockRequest().post(endpoint, body);
	return await new CaseLabelController().postCaseLabelHandler(request);
};

const fetchApi = async (caseId: string, data: CreateCaseLabelDTO): Promise<Response> => {
	const endpoint = `/users/cases/${caseId}/case-labels`;
	const body = JSON.stringify(data);
	return await new FetchWrapper().post(endpoint, body);
};

export const createCaseLabel = async (caseId: string, data: CreateCaseLabelDTO): Promise<Response> => {
	return useLocalBackend ? await mockApi(caseId, data) : await fetchApi(caseId, data);
};
