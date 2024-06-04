import { mockRequest } from "../../../lib/mock-request";
import { FolderLabelController } from "../../../services/mock-backend/case-folder-label/folder-label-controller";

const mockApi = async () => {
  const request = mockRequest.get(`/dashboard`);
  return await FolderLabelController.getAllCaseLabelsByUserId(request);
}

export const getCaseLabels = async () => {
  return await mockApi();
}