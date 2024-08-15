import { useLocalBackend } from "../../../config/use-local-backend";
import { FetchWrapper } from "../../../lib/fetch-wrapper";
import { MockRequest } from "../../../lib/mock-request";
import { CaseLabelController } from "../../../services/local-backend/case-label/case-label-controller";

const mockApi = async (caseId: string): Promise<Response> => {
	const endpoint = `/users/cases/${caseId}/case-labels`;
	const request = new MockRequest().delete(endpoint);
	return await new CaseLabelController().deleteAllCaseLabelsByCaseIdHandler(request);
};

const fetchApi = async (caseId: string): Promise<Response> => {
	const endpoint = `/users/cases/${caseId}/case-labels`;
	return await new FetchWrapper().delete(endpoint);
};

export const deleteAllCaseLabelsByCaseId = async (caseId: string): Promise<Response> => {
	return useLocalBackend ? await mockApi(caseId) : await fetchApi(caseId);
};
