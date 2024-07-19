import { mockRequest } from "../../../lib/mock-request";
import { ClientController } from "../../../services/local-backend/client/client-controller";

const mockApi = async (caseId: string) => {
	const endpoint = `/users/cases/${caseId}/clients`;
	const request = mockRequest.get(endpoint);
	return await new ClientController().getClientByCaseIdHandler(request);
};

export const getClient = async (caseId: string) => {
	return await mockApi(caseId);
};
