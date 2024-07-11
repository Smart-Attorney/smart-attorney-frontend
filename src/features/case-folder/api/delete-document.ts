import { mockRequest } from "../../../lib/mock-request";
import { DocumentController } from "../../../services/local-backend/document/document-controller";

const mockApi = async (folderId: string, fileId: string) => {
	const request = mockRequest.delete(`/case/${folderId}/${fileId}`);
	return await new DocumentController().deleteDocumentById(request);
};

export const deleteDocument = async (folderId: string, fileId: string) => {
	return await mockApi(folderId, fileId);
};
