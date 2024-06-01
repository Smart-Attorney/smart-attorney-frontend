import { mockRequest } from "../../../lib/mock-request";
import { CaseFileController } from "../../../services/mock-backend/case-file/case-file-controller";

const mockApi = async (folderId: string) => {
	const request = mockRequest.get(`/case/${folderId}`);
	return await CaseFileController.getCaseFilesByFolderId(request);
};

export const getCaseFiles = async (folderId: string) => {
	return await mockApi(folderId);
};
