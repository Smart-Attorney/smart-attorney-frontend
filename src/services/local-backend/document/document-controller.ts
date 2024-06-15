import { UpdateCaseFileDeadlineDTO } from "../../../features/case-folder/api/update-case-file-deadline";
import { UpdateCaseFileNameDTO } from "../../../features/case-folder/api/update-case-file-name";
import { DocumentStatus } from "../../../utils/types";
import { DocumentService } from "./document-service";

export class DocumentController {
	private documentService: DocumentService;

	constructor() {
		this.documentService = new DocumentService();
	}

	public async createDocuments(request: Request): Promise<Response> {
		const authHeader = request.headers.get("Authorization");
		if (!authHeader) {
			throw new Error("User is not authorized/signed in.");
		}
		const authToken = JSON.parse(authHeader);
		const userId = authToken.id as string;
		const formData = await request.formData();
		const caseId = formData.get("caseFolderId") as string;
		const files = formData.getAll("files[]") as File[];
		const newDocuments = await this.documentService.create(userId, caseId, files);
		if (newDocuments !== null) {
			const body = JSON.stringify(newDocuments);
			const options = { status: 200 };
			return new Response(body, options);
		} else {
			throw new Error("There was an issue with uploading the file(s).");
		}
	}

	public async getDocumentsByCaseId(request: Request): Promise<Response> {
		const urlArray = request.url.split("/");
		const caseId = urlArray[urlArray.length - 1];
		const retrievedDocuments = await this.documentService.getAllByCaseId(caseId);
		if (retrievedDocuments !== null) {
			const body = JSON.stringify(retrievedDocuments);
			const options = { status: 200 };
			return new Response(body, options);
		} else {
			throw new Error("There was an issue with retrieving the case files.");
		}
	}

	public async getDocumentById(request: Request): Promise<Response> {
		const authHeader = request.headers.get("Authorization");
		if (!authHeader) {
			throw new Error("User is not authorized/signed in.");
		}
		const authToken = JSON.parse(authHeader);
		const userId = authToken.id as string;
		const urlArray = request.url.split("/");
		const caseId = urlArray[urlArray.length - 2];
		const documentId = urlArray[urlArray.length - 1];
		const retrievedDocument = await this.documentService.getById(userId, caseId, documentId);
		if (retrievedDocument !== null) {
			const body = JSON.stringify(retrievedDocument);
			const options = { status: 200 };
			return new Response(body, options);
		} else {
			throw new Error("There was an issue with retrieving the case file.");
		}
	}

	public async getDocumentDeadlines(request: Request): Promise<Response> {
		const authHeader = request.headers.get("Authorization");
		if (!authHeader) {
			throw new Error("User is not authorized/signed in.");
		}
		const authToken = JSON.parse(authHeader);
		const userId = authToken.id as string;
		const retrievedDeadlines = await this.documentService.getAllByUserId(userId);
		if (retrievedDeadlines != null) {
			const body = JSON.stringify(retrievedDeadlines);
			const options = { status: 200 };
			return new Response(body, options);
		} else {
			throw new Error("There was an issue with retrieving the document deadlines.");
		}
	}

	public async updateDocumentStatus(request: Request): Promise<Response> {
		const urlArray = request.url.split("/");
		const caseId = urlArray[urlArray.length - 2];
		const documentId = urlArray[urlArray.length - 1];
		const newStatus: DocumentStatus = await request.json();
		const updatedDocument = await this.documentService.updateStatus(caseId, documentId, newStatus);
		if (updatedDocument !== null) {
			const body = JSON.stringify(updatedDocument);
			const options = { status: 200 };
			return new Response(body, options);
		} else {
			throw new Error("There was an issue with updating the case file status.");
		}
	}

	public async updateDocumentName(request: Request): Promise<Response> {
		const urlArray = request.url.split("/");
		const caseId = urlArray[urlArray.length - 2];
		const documentId = urlArray[urlArray.length - 1];
		const newName: UpdateCaseFileNameDTO = await request.json();
		const updatedDocument = await this.documentService.updateName(caseId, documentId, newName);
		if (updatedDocument !== null) {
			const body = JSON.stringify(updatedDocument);
			const options = { status: 200 };
			return new Response(body, options);
		} else {
			throw new Error("There was an issue with updating the case file name.");
		}
	}

	public async updateDocumentDeadline(request: Request): Promise<Response> {
		const urlArray = request.url.split("/");
		const caseId = urlArray[urlArray.length - 2];
		const documentId = urlArray[urlArray.length - 1];
		const newDeadline: UpdateCaseFileDeadlineDTO = await request.json();
		const updatedDocument = await this.documentService.updateDeadline(caseId, documentId, newDeadline);
		if (updatedDocument !== null) {
			const body = JSON.stringify(updatedDocument);
			const options = { status: 200 };
			return new Response(body, options);
		} else {
			throw new Error("There was an issue with updating the case file deadline.");
		}
	}

	public async deleteDocumentById(request: Request): Promise<Response> {
		const authHeader = request.headers.get("Authorization");
		if (!authHeader) {
			throw new Error("User is not authorized/signed in.");
		}
		const authToken = JSON.parse(authHeader);
		const userId = authToken.id as string;
		const urlArray = request.url.split("/");
		const caseId = urlArray[urlArray.length - 2];
		const documentId = urlArray[urlArray.length - 1];
		const deletedFile = await this.documentService.deleteById(userId, caseId, documentId);
		if (deletedFile !== null) {
			const body = JSON.stringify(deletedFile);
			const options = { status: 200 };
			return new Response(body, options);
		} else {
			throw new Error("There was an issue with deleting the case file.");
		}
	}
}
