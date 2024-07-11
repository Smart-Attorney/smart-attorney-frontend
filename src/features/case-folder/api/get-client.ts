import { mockRequest } from "../../../lib/mock-request";
import { ClientController } from "../../../services/local-backend/client/client-controller";

const mockApi = async (folderId: string) => {
	const request = mockRequest.get(`/case/${folderId}`);
	return await new ClientController().getClient(request);
};

export const getClient = async (folderId: string) => {
	return await mockApi(folderId);
};
