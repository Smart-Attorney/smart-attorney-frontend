import { mockRequest } from "../../../lib/mock-request";
import { CaseFileController } from "../../../services/local-backend/document/case-file-controller";

const mockApi = async (folderId: string, fileId: string) => {
	const request = mockRequest.delete(`/case/${folderId}/${fileId}`);
	return await CaseFileController.deleteDocumentById(request);
};

export const deleteCaseFileById = async (folderId: string, fileId: string) => {
	return await mockApi(folderId, fileId);
};
