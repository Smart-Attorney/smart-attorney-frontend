import { mockRequest } from "../../../lib/mock-request";
import { ClientController } from "../../../services/local-backend/client/client-controller";
import { Sex } from "../../../types/api";

export type CreateClientDTO = {
	firstName: string;
	middleName: string;
	lastName: string;
	dateOfBirth: number;
	sex: Sex;
	countryOfCitizenship: string;
	primaryLanguage: string;
	caseId: string;
};

const mockApi = async (data: CreateClientDTO) => {
	const request = mockRequest.post("/create-case", data);
	return await new ClientController().postClientHandler(request);
};

export const createClient = async (data: CreateClientDTO) => {
	return await mockApi(data);
};
