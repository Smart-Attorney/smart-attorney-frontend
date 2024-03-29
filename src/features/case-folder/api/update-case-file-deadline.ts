import { mockRequest } from "../../../lib/mock-request";
import { CaseFileController } from "../../../services/mock-backend/controller/case-file-controller";

export type UpdateCaseFileDeadlineDTO = number;

const mockApi = async (folderId: string, fileId: string, newDeadline: number) => {
	const request = mockRequest.put(`/case/${folderId}/${fileId}`, newDeadline);
	return await CaseFileController.updateFileDeadline(request);
};

export const updateDeadline = async (folderId: string, fileId: string, newDeadline: number) => {
	return await mockApi(folderId, fileId, newDeadline);
};
