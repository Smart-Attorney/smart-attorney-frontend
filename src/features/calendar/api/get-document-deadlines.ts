import { mockRequest } from "../../../lib/mock-request";
import { DocumentController } from "../../../services/local-backend/document/document-controller";

const mockApi = async () => {
	const request = mockRequest.get(`/calendar`);
	return await new DocumentController().getDocumentDeadlines(request);
};

export const getUserDocumentDeadlines = async () => {
	return await mockApi();
};
