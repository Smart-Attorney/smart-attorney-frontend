import { mockRequest } from "../../../lib/mock-request";
import { DocumentController } from "../../../services/local-backend/document/document-controller";

const mockApi = async (folderId: string) => {
	const request = mockRequest.get(`/case/${folderId}`);
	return await new DocumentController().getDocumentsByCaseId(request);
};

export const getCaseFiles = async (folderId: string) => {
	return await mockApi(folderId);
};
