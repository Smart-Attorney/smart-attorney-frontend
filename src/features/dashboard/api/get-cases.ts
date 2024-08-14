import { useLocalBackend } from "../../../config/use-local-backend";
import { FetchWrapper } from "../../../lib/fetch-wrapper";
import { MockRequest } from "../../../lib/mock-request";
import { CasesController } from "../../../services/local-backend/cases/cases-controller";

const mockApi = async (): Promise<Response> => {
	const endpoint = `/users/cases`;
	const request = new MockRequest().get(endpoint);
	return await new CasesController().getAllCasesByUserIdHandler(request);
};

const fetchApi = async (): Promise<Response> => {
	const endpoint = `/users/cases`;
	return await new FetchWrapper().get(endpoint);
};

export const getCases = async (): Promise<Response> => {
	return useLocalBackend ? await mockApi() : await fetchApi();
};
