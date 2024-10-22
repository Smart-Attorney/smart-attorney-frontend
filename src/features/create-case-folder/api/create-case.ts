import { useLocalBackend } from "../../../config/use-local-backend";
import { FetchWrapper } from "../../../lib/fetch-wrapper";
import { MockRequest } from "../../../lib/mock-request";
import { CasesController } from "../../../services/local-backend/cases/cases-controller";
import { Case } from "../../../types/api";

export type CreateCaseDTO = Pick<Case, "name">;

const mockApi = async (data: CreateCaseDTO): Promise<Response> => {
	const endpoint = `/users/cases`;
	const body = JSON.stringify(data);
	const request = new MockRequest().post(endpoint, body);
	return await new CasesController().postCaseHandler(request);
};

const fetchApi = async (data: CreateCaseDTO): Promise<Response> => {
	const endpoint = `/users/cases`;
	const body = JSON.stringify(data);
	return await new FetchWrapper().post(endpoint, body);
};

export const createCase = async (data: CreateCaseDTO): Promise<Response> => {
	return useLocalBackend ? await mockApi(data) : await fetchApi(data);
};
