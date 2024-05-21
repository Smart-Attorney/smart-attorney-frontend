import { mockRequest } from "../../../lib/mock-request";
import { CaseFileController } from "../../../services/mock-backend/controller/case-file-controller";
import { FileStatus } from "../../../utils/types";

const mockApi = async (folderId: string, fileId: string, newFileStatus: FileStatus) => {
	const request = mockRequest.put(`/case/${folderId}/${fileId}`, newFileStatus);
	return await CaseFileController.updateFileStatus(request);
};

export const updateCaseFileStatus = async (folderId: string, fileId: string, newStatus: FileStatus) => {
	return await mockApi(folderId, fileId, newStatus);
};
