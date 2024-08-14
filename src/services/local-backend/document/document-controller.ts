import { UpdateDocumentDeadlineDTO } from "../../../features/case-folder/api/update-document-deadline";
import { UpdateDocumentNameDTO } from "../../../features/case-folder/api/update-document-name";
import { UpdateDocumentStatusDTO } from "../../../features/case-folder/api/update-document-status";
import { DocumentService } from "./document-service";

export class DocumentController {
	private documentService: DocumentService;

	constructor() {
		this.documentService = new DocumentService();
	}

	public async getAllDocumentsByUserIdHandler(request: Request): Promise<Response> {
		const authHeader = request.headers.get("Authorization");
		if (!authHeader) {
			throw new Error("User is not authorized/signed in.");
		}
		const authToken = JSON.parse(authHeader);
		const userId = authToken.id as string;
		const retrievedDeadlines = await this.documentService.getAllDocumentsByUserId(userId);
		if (retrievedDeadlines != null) {
			const body = JSON.stringify(retrievedDeadlines);
			const options = { status: 200 };
			return new Response(body, options);
		} else {
			throw new Error("There was an issue with retrieving the document deadlines.");
		}
	}

	public async getDocumentByIdHandler(request: Request): Promise<Response> {
		const authHeader = request.headers.get("Authorization");
		if (!authHeader) {
			throw new Error("User is not authorized/signed in.");
		}
		// const authToken = JSON.parse(authHeader);
		// const userId = authToken.id as string;
		const urlArray = request.url.split("/");
		// const caseId = urlArray[urlArray.length - 3];
		const documentId = urlArray[urlArray.length - 1];
		const retrievedDocument = await this.documentService.getDocument(documentId);
		if (retrievedDocument !== null) {
			const body = JSON.stringify(retrievedDocument);
			const options = { status: 200 };
			return new Response(body, options);
		} else {
			throw new Error("There was an issue with retrieving the case file.");
		}
	}

	public async postDocumentsHandler(request: Request): Promise<Response> {
		const authHeader = request.headers.get("Authorization");
		if (!authHeader) {
			throw new Error("User is not authorized/signed in.");
		}
		const authToken = JSON.parse(authHeader);
		const userId = authToken.id as string;
		const urlArray = request.url.split("/");
		const caseId = urlArray[urlArray.length - 2];
		const formData = await request.formData();
		const files = formData.getAll("files[]") as File[];
		const newDocuments = await this.documentService.addDocument(userId, caseId, files);
		if (newDocuments !== null) {
			const body = JSON.stringify(newDocuments);
			const options = { status: 200 };
			return new Response(body, options);
		} else {
			throw new Error("There was an issue with uploading the file(s).");
		}
	}

	public async updateDocumentStatusHandler(request: Request): Promise<Response> {
		const urlArray = request.url.split("/");
		// const caseId = urlArray[urlArray.length - 3];
		const documentId = urlArray[urlArray.length - 1];
		const body: UpdateDocumentStatusDTO = await request.json();
		const { status } = body;
		const updatedDocument = await this.documentService.updateDocumentStatus(documentId, status);
		if (updatedDocument !== null) {
			const body = JSON.stringify(updatedDocument);
			const options = { status: 200 };
			return new Response(body, options);
		} else {
			throw new Error("There was an issue with updating the case file status.");
		}
	}

	public async updateDocumentNameHandler(request: Request): Promise<Response> {
		const urlArray = request.url.split("/");
		// const caseId = urlArray[urlArray.length - 3];
		const documentId = urlArray[urlArray.length - 1];
		const body: UpdateDocumentNameDTO = await request.json();
		const { name } = body;
		const updatedDocument = await this.documentService.updateDocumentName(documentId, name);
		if (updatedDocument !== null) {
			const body = JSON.stringify(updatedDocument);
			const options = { status: 200 };
			return new Response(body, options);
		} else {
			throw new Error("There was an issue with updating the case file name.");
		}
	}

	public async updateDocumentDeadlineHandler(request: Request): Promise<Response> {
		const urlArray = request.url.split("/");
		// const caseId = urlArray[urlArray.length - 3];
		const documentId = urlArray[urlArray.length - 1];
		const body: UpdateDocumentDeadlineDTO = await request.json();
		const { deadline } = body;
		const updatedDocument = await this.documentService.updateDocumentDeadline(documentId, deadline);
		if (updatedDocument !== null) {
			const body = JSON.stringify(updatedDocument);
			const options = { status: 200 };
			return new Response(body, options);
		} else {
			throw new Error("There was an issue with updating the case file deadline.");
		}
	}

	// TODO
	public async updateDocumentLastOpenedDateHandler(request: Request): Promise<Response> {
		request;
		return new Response();
	}

	public async deleteDocumentByIdHandler(request: Request): Promise<Response> {
		const authHeader = request.headers.get("Authorization");
		if (!authHeader) {
			throw new Error("User is not authorized/signed in.");
		}
		const authToken = JSON.parse(authHeader);
		const userId = authToken.id as string;
		const urlArray = request.url.split("/");
		const caseId = urlArray[urlArray.length - 3];
		const documentId = urlArray[urlArray.length - 1];
		const deletedFile = await this.documentService.deleteDocument(userId, caseId, documentId);
		if (deletedFile !== null) {
			const body = JSON.stringify(deletedFile);
			const options = { status: 200 };
			return new Response(body, options);
		} else {
			throw new Error("There was an issue with deleting the case file.");
		}
	}
}
