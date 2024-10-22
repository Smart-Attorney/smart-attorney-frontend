import { useLocalBackend } from "../../../config/use-local-backend";
import { FetchWrapper } from "../../../lib/fetch-wrapper";
import { MockRequest } from "../../../lib/mock-request";
import { ClientController } from "../../../services/local-backend/client/client-controller";
import { Client } from "../../../types/api";

export type CreateClientDTO = Omit<Client, "id">;

const mockApi = async (caseId: string, data: CreateClientDTO): Promise<Response> => {
	const endpoint = `/users/cases/${caseId}/clients`;
	const body = JSON.stringify(data);
	const request = new MockRequest().post(endpoint, body);
	return await new ClientController().postClientHandler(request);
};

const fetchApi = async (caseId: string, data: CreateClientDTO): Promise<Response> => {
	const endpoint = `/users/cases/${caseId}/clients`;
	const body = JSON.stringify(data);
	return await new FetchWrapper().post(endpoint, body);
};

export const createClient = async (caseId: string, data: CreateClientDTO): Promise<Response> => {
	return useLocalBackend ? await mockApi(caseId, data) : await fetchApi(caseId, data);
};
