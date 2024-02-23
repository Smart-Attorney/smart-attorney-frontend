import { mockRequest } from "../../../lib/mock-request";
import { ClientController } from "../../../services/mock-backend/controller/client-controller";

const mockApi = async (folderId: string) => {
	const request = mockRequest.get(`/case/${folderId}`);
	return await ClientController.getClient(request);
};

export const getCaseClient = async (folderId: string) => {
	return await mockApi(folderId);
};
