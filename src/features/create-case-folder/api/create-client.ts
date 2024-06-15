import { mockRequest } from "../../../lib/mock-request";
import { ClientController } from "../../../services/local-backend/client/client-controller";
import { SexOption } from "../../../utils/types";

export interface CreateClientDTO {
	firstName: string;
	middleName: string;
	lastName: string;
	dateOfBirth: number;
	sex: SexOption;
	countryOfCitizenship: string;
	primaryLanguage: string;
	caseFolderId: string;
}

const mockApi = async (data: CreateClientDTO) => {
	const request = mockRequest.post("/create-case", data);
	return await new ClientController().createClient(request);
};

export const createClient = async (data: CreateClientDTO) => {
	return await mockApi(data);
};
