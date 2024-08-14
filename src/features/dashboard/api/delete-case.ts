import { useLocalBackend } from "../../../config/use-local-backend";
import { FetchWrapper } from "../../../lib/fetch-wrapper";
import { MockRequest } from "../../../lib/mock-request";
import { CasesController } from "../../../services/local-backend/cases/cases-controller";

const mockApi = async (caseId: string): Promise<Response> => {
	const endpoint = `/users/cases/${caseId}`;
	const request = new MockRequest().delete(endpoint);
	return await new CasesController().deleteCaseHandler(request);
};

const fetchApi = async (caseId: string): Promise<Response> => {
	const endpoint = `/users/cases/${caseId}`;
	return await new FetchWrapper().delete(endpoint);
};

export const deleteCase = async (caseId: string): Promise<Response> => {
	return useLocalBackend ? await mockApi(caseId) : await fetchApi(caseId);
};
