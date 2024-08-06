import { mockRequest } from "../../../lib/mock-request";
import { DocumentController } from "../../../services/local-backend/document/document-controller";

const mockApi = async () => {
	const endpoint = `/users/documents`;
	const request = mockRequest.get(endpoint);
	return await new DocumentController().getAllDocumentsByUserIdHandler(request);
};

export const getUserDocuments = async () => {
	return await mockApi();
};
