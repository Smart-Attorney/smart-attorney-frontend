import { mockRequest } from "../../../lib/mock-request";
import { FolderLabelController } from "../../../services/mock-backend/case-folder-label/folder-label-controller";

const mockApi = async (): Promise<Response> => {
	const request = mockRequest.get(`/dashboard`);
	return await FolderLabelController.getAll(request);
};

export const getCaseLabels = async (): Promise<Response> => {
	return await mockApi();
};
