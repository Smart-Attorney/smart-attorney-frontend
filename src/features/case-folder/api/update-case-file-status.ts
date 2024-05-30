import { mockRequest } from "../../../lib/mock-request";
import { CaseFileController } from "../../../services/mock-backend/controller/case-file-controller";
import { DocumentStatus } from "../../../utils/types";

const mockApi = async (folderId: string, fileId: string, newFileStatus: DocumentStatus) => {
	const request = mockRequest.put(`/case/${folderId}/${fileId}`, newFileStatus);
	return await CaseFileController.updateFileStatus(request);
};

export const updateCaseFileStatus = async (folderId: string, fileId: string, newStatus: DocumentStatus) => {
	return await mockApi(folderId, fileId, newStatus);
};
