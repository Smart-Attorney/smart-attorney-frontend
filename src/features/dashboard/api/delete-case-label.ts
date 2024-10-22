import { useLocalBackend } from "../../../config/use-local-backend";
import { FetchWrapper } from "../../../lib/fetch-wrapper";
import { MockRequest } from "../../../lib/mock-request";
import { CaseLabelController } from "../../../services/local-backend/case-label/case-label-controller";

const mockApi = async (caseId: string, caseLabelId: string): Promise<Response> => {
	const endpoint = `/users/cases/${caseId}/case-labels/${caseLabelId}`;
	const request = new MockRequest().delete(endpoint);
	return await new CaseLabelController().deleteCaseLabelByIdHandler(request);
};

const fetchApi = async (caseId: string, caseLabelId: string): Promise<Response> => {
	const endpoint = `/users/cases/${caseId}/case-labels/${caseLabelId}`;
	return await new FetchWrapper().delete(endpoint);
};

export const deleteCaseLabel = async (caseId: string, caseLabelId: string): Promise<Response> => {
	return useLocalBackend ? await mockApi(caseId, caseLabelId) : await fetchApi(caseId, caseLabelId);
};
