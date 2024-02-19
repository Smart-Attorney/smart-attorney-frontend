import { mockRequest } from "../../../lib/mock-request";
import { CaseFolderController } from "../../../services/mock-backend/controller/case-folder-controller";
import { FileForUploadObj, SexOptions } from "../../../utils/types";

export interface CreateClientDTO {
	firstName: string;
	lastName: string;
	dateOfBirth: number;
	sex: SexOptions;
	countryOfCitizenship: string;
	primaryLanguage: string;
}

export interface CreateCaseFolderDTO {
	name: string;
	files: FileForUploadObj[];
	client: CreateClientDTO;
}

const mockApi = async (data: any) => {
	const request = mockRequest.post("/create-case", data);
	return await CaseFolderController.createCaseFolder(request);
};

export const createCaseFolder = async (data: any) => {
	return await mockApi(data);
};
