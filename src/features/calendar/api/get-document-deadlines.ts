import { mockRequest } from "../../../lib/mock-request";
import { CaseFileController } from "../../../services/mock-backend/case-file/case-file-controller";

const mockApi = async () => {
	const request = mockRequest.get(`/calendar`);
	return await CaseFileController.getDocumentDeadlines(request);
};

export const getUserDocumentDeadlines = async () => {
	return await mockApi();
};
