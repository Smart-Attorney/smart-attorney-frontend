import { mockRequest } from "../../../lib/mock-request";
import { ClientController } from "../../../services/local-backend/client/client-controller";

const mockApi = async (caseId: string) => {
	const request = mockRequest.get(`/case/${caseId}`);
	return await new ClientController().getClientByCaseIdHandler(request);
};

export const getClient = async (caseId: string) => {
	return await mockApi(caseId);
};
