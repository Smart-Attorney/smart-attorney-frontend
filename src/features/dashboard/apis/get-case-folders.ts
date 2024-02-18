import { CaseFolderController } from "../../../services/mock-backend/controller/case-folder-controller";

const mockApi = async (url: string) => {
	const options = { method: "GET" };
	const request = new Request(url, options);
	return await CaseFolderController.getAllCaseFolders(request);
};

export const getCaseFolders = async (url: string) => {
	return await mockApi(url);
};
