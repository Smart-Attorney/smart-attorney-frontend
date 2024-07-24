import { mockRequest } from "../../../lib/mock-request";
import { ClientController } from "../../../services/local-backend/client/client-controller";
import { Client } from "../../../types/api";

export type CreateClientDTO = Omit<Client, "id">;

const mockApi = async (caseId: string, data: CreateClientDTO) => {
	const endpoint = `/users/cases/${caseId}/clients`;
	const request = mockRequest.post(endpoint, data);
	return await new ClientController().postClientHandler(request);
};

export const createClient = async (caseId: string, data: CreateClientDTO) => {
	return await mockApi(caseId, data);
};
