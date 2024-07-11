import { mockRequest } from "../../../lib/mock-request";
import { DocumentController } from "../../../services/local-backend/document/document-controller";
import { DocumentStatus } from "../../../types/api";

const mockApi = async (folderId: string, fileId: string, newFileStatus: DocumentStatus) => {
	const request = mockRequest.put(`/case/${folderId}/${fileId}`, newFileStatus);
	return await new DocumentController().updateDocumentStatus(request);
};

export const updateCaseFileStatus = async (folderId: string, fileId: string, newStatus: DocumentStatus) => {
	return await mockApi(folderId, fileId, newStatus);
};
