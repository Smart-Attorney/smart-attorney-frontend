import { useLocalBackend } from "../../../config/use-local-backend";
import { FetchWrapper } from "../../../lib/fetch-wrapper";
import { MockRequest } from "../../../lib/mock-request";
import { ClientController } from "../../../services/local-backend/client/client-controller";

const mockApi = async (caseId: string): Promise<Response> => {
	const endpoint = `/users/cases/${caseId}/clients`;
	const request = new MockRequest().get(endpoint);
	return await new ClientController().getClientByCaseIdHandler(request);
};

const fetchApi = async (caseId: string): Promise<Response> => {
	const endpoint = `/users/cases/${caseId}/clients`;
	return await new FetchWrapper().get(endpoint);
};

export const getClient = async (caseId: string): Promise<Response> => {
	return useLocalBackend ? await mockApi(caseId) : await fetchApi(caseId);
};
