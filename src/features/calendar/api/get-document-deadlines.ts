import { mockRequest } from "../../../lib/mock-request";
import { CaseFileController } from "../../../services/local-backend/document/case-file-controller";

const mockApi = async () => {
	const request = mockRequest.get(`/calendar`);
	return await CaseFileController.getDocumentDeadlines(request);
};

export const getUserDocumentDeadlines = async () => {
	return await mockApi();
};
