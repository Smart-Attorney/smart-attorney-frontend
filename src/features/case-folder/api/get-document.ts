import { mockRequest } from "../../../lib/mock-request";
import { DocumentController } from "../../../services/local-backend/document/document-controller";

const mockApi = async (folderId: string, fileId: string) => {
	const request = mockRequest.get(`/case/${folderId}/${fileId}`);
	return await new DocumentController().getDocumentById(request);
};

export const getDocument = async (folderId: string, fileId: string) => {
	return await mockApi(folderId, fileId);
};
