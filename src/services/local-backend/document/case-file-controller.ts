import { UpdateCaseFileDeadlineDTO } from "../../../features/case-folder/api/update-case-file-deadline";
import { UpdateCaseFileNameDTO } from "../../../features/case-folder/api/update-case-file-name";
import { DocumentStatus } from "../../../utils/types";
import { CaseFileService } from "./case-file-service";

export class CaseFileController {
	static async createCaseFiles(request: Request): Promise<Response> {
		const authHeader = request.headers.get("Authorization");
		if (!authHeader) {
			throw new Error("User is not authorized/signed in.");
		}
		const authToken = JSON.parse(authHeader);
		const userId: string = authToken.id;
		const formData = await request.formData();
		const folderId = formData.get("caseFolderId") as string;
		const files = formData.getAll("files[]") as File[];
		const createdCaseFiles = await CaseFileService.create(userId, folderId, files);
		if (createdCaseFiles !== null) {
			const body = JSON.stringify(createdCaseFiles);
			const options = { status: 200 };
			return new Response(body, options);
		} else {
			throw new Error("There was an issue with uploading the file(s).");
		}
	}

	static async getCaseFilesByFolderId(request: Request): Promise<Response> {
		const urlArray = request.url.split("/");
		const folderId = urlArray[urlArray.length - 1];
		const retrievedCaseFiles = await CaseFileService.getAllByCaseId(folderId);
		if (retrievedCaseFiles !== null) {
			const body = JSON.stringify(retrievedCaseFiles);
			const options = { status: 200 };
			return new Response(body, options);
		} else {
			throw new Error("There was an issue with retrieving the case files.");
		}
	}

	static async getCaseFileByIdFromDB(request: Request): Promise<Response> {
		const authHeader = request.headers.get("Authorization");
		if (!authHeader) {
			throw new Error("User is not authorized/signed in.");
		}
		const authToken = JSON.parse(authHeader);
		const userId: string = authToken.id;
		const urlArray = request.url.split("/");
		const folderId = urlArray[urlArray.length - 2];
		const fileId = urlArray[urlArray.length - 1];
		const retrievedCaseFile = await CaseFileService.getById(userId, folderId, fileId);
		if (retrievedCaseFile !== null) {
			const body = JSON.stringify(retrievedCaseFile);
			const options = { status: 200 };
			return new Response(body, options);
		} else {
			throw new Error("There was an issue with retrieving the case file.");
		}
	}

	static async getDocumentDeadlines(request: Request): Promise<Response> {
		const authHeader = request.headers.get("Authorization");
		if (!authHeader) {
			throw new Error("User is not authorized/signed in.");
		}
		const authToken = JSON.parse(authHeader);
		const userId: string = authToken.id;
		const retrievedDocumentDeadlines = await CaseFileService.getAllByUserId(userId);
		if (retrievedDocumentDeadlines != null) {
			const body = JSON.stringify(retrievedDocumentDeadlines);
			const options = { status: 200 };
			return new Response(body, options);
		} else {
			throw new Error("There was an issue with retrieving the document deadlines.");
		}
	}

	static async updateDocumentStatus(request: Request): Promise<Response> {
		const urlArray = request.url.split("/");
		const folderId = urlArray[urlArray.length - 2];
		const fileId = urlArray[urlArray.length - 1];
		const newStatus: DocumentStatus = await request.json();
		const updatedDocument = await CaseFileService.updateStatus(folderId, fileId, newStatus);
		if (updatedDocument !== null) {
			const body = JSON.stringify(updatedDocument);
			const options = { status: 200 };
			return new Response(body, options);
		} else {
			throw new Error("There was an issue with updating the case file status.");
		}
	}

	static async updateDocumentName(request: Request): Promise<Response> {
		const urlArray = request.url.split("/");
		const folderId = urlArray[urlArray.length - 2];
		const fileId = urlArray[urlArray.length - 1];
		const newName: UpdateCaseFileNameDTO = await request.json();
		const updatedDocument = await CaseFileService.updateName(folderId, fileId, newName);
		if (updatedDocument !== null) {
			const body = JSON.stringify(updatedDocument);
			const options = { status: 200 };
			return new Response(body, options);
		} else {
			throw new Error("There was an issue with updating the case file name.");
		}
	}

	static async updateDocumentDeadline(request: Request): Promise<Response> {
		const urlArray = request.url.split("/");
		const folderId = urlArray[urlArray.length - 2];
		const fileId = urlArray[urlArray.length - 1];
		const newDeadline: UpdateCaseFileDeadlineDTO = await request.json();
		const updatedDocument = await CaseFileService.updateDeadline(folderId, fileId, newDeadline);
		if (updatedDocument !== null) {
			const body = JSON.stringify(updatedDocument);
			const options = { status: 200 };
			return new Response(body, options);
		} else {
			throw new Error("There was an issue with updating the case file deadline.");
		}
	}

	static async deleteDocumentById(request: Request): Promise<Response> {
		const authHeader = request.headers.get("Authorization");
		if (!authHeader) {
			throw new Error("User is not authorized/signed in.");
		}
		const authToken = JSON.parse(authHeader);
		const userId: string = authToken.id;
		const urlArray = request.url.split("/");
		const folderId = urlArray[urlArray.length - 2];
		const fileId = urlArray[urlArray.length - 1];
		const deletedFile = await CaseFileService.deleteById(userId, folderId, fileId);
		if (deletedFile !== null) {
			const body = JSON.stringify(deletedFile);
			const options = { status: 200 };
			return new Response(body, options);
		} else {
			throw new Error("There was an issue with deleting the case file.");
		}
	}
}
