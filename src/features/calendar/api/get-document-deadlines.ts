import { useLocalBackend } from "../../../config/use-local-backend";
import { FetchWrapper } from "../../../lib/fetch-wrapper";
import { MockRequest } from "../../../lib/mock-request";
import { DocumentController } from "../../../services/local-backend/document/document-controller";

const mockApi = async (): Promise<Response> => {
	const endpoint = `/users/documents`;
	const request = new MockRequest().get(endpoint);
	return await new DocumentController().getAllDocumentsByUserIdHandler(request);
};

const fetchApi = async (): Promise<Response> => {
	const endpoint = `/users/documents`;
	return await new FetchWrapper().get(endpoint);
};

export const getUserDocuments = async (): Promise<Response> => {
	return useLocalBackend ? await mockApi() : await fetchApi();
};
