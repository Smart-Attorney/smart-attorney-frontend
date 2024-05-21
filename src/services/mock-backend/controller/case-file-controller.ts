import { UpdateCaseFileDeadlineDTO } from "../../../features/case-folder/api/update-case-file-deadline";
import { UpdateCaseFileNameDTO } from "../../../features/case-folder/api/update-case-file-name";
import { FileStatus } from "../../../utils/types";
import { CaseFileService } from "../service/case-file-service";

export class CaseFileController {
	static async createCaseFiles(request: Request) {
		const authHeader = request.headers.get("Authorization");
		if (!authHeader) {
			throw new Error("User is not authorized/signed in.");
		}
		const authToken = JSON.parse(authHeader);
		const userId: string = authToken.id;
		const formData = await request.formData();
		const folderId = formData.get("caseFolderId") as string;
		const files = formData.getAll("files[]") as File[];
		const createdCaseFiles = await CaseFileService.createCaseFiles(userId, folderId, files);
		if (createdCaseFiles !== null) {
			const body = JSON.stringify(createdCaseFiles);
			const options = { status: 200 };
			return new Response(body, options);
		} else {
			throw new Error("There was an issue with uploading the file(s).");
		}
	}

	static async getCaseFilesByFolderId(request: Request) {
		const urlArray = request.url.split("/");
		const folderId = urlArray[urlArray.length - 1];
		const retrievedCaseFiles = await CaseFileService.getCaseFilesByFolderId(folderId);
		if (retrievedCaseFiles !== null) {
			const body = JSON.stringify(retrievedCaseFiles);
			const options = { status: 200 };
			return new Response(body, options);
		} else {
			throw new Error("There was an issue with retrieving the case files.");
		}
	}

	static async getCaseFileByIdFromDB(request: Request) {
		const authHeader = request.headers.get("Authorization");
		if (!authHeader) {
			throw new Error("User is not authorized/signed in.");
		}
		const authToken = JSON.parse(authHeader);
		const userId: string = authToken.id;
		const urlArray = request.url.split("/");
		const folderId = urlArray[urlArray.length - 2];
		const fileId = urlArray[urlArray.length - 1];
		const retrievedCaseFile = await CaseFileService.getCaseFileByIdFromDB(userId, folderId, fileId);
		if (retrievedCaseFile !== null) {
			const body = JSON.stringify(retrievedCaseFile);
			const options = { status: 200 };
			return new Response(body, options);
		} else {
			throw new Error("There was an issue with retrieving the case file.");
		}
	}

	static async updateFileStatus(request: Request) {
		const urlArray = request.url.split("/");
		const folderId = urlArray[urlArray.length - 2];
		const fileId = urlArray[urlArray.length - 1];
		const newStatus: FileStatus = await request.json();
		const updatedFileStatus = await CaseFileService.updateFileStatus(folderId, fileId, newStatus);
		if (updatedFileStatus !== null) {
			const updatedCaseFiles = await CaseFileService.getCaseFilesByFolderId(folderId);
			const body = JSON.stringify(updatedCaseFiles);
			const options = { status: 200 };
			return new Response(body, options);
		} else {
			throw new Error("There was an issue with updating the case file status.");
		}
	}

	static async updateFileName(request: Request) {
		const urlArray = request.url.split("/");
		const folderId = urlArray[urlArray.length - 2];
		const fileId = urlArray[urlArray.length - 1];
		const newName: UpdateCaseFileNameDTO = await request.json();
		const updatedFileName = await CaseFileService.updateFileName(folderId, fileId, newName);
		if (updatedFileName !== null) {
			const updatedCaseFiles = await CaseFileService.getCaseFilesByFolderId(folderId);
			const body = JSON.stringify(updatedCaseFiles);
			const options = { status: 200 };
			return new Response(body, options);
		} else {
			throw new Error("There was an issue with updating the case file name.");
		}
	}

	static async updateFileDeadline(request: Request) {
		const urlArray = request.url.split("/");
		const folderId = urlArray[urlArray.length - 2];
		const fileId = urlArray[urlArray.length - 1];
		const newDeadline: UpdateCaseFileDeadlineDTO = await request.json();
		const updatedDeadline = await CaseFileService.updateFileDeadline(folderId, fileId, newDeadline);
		if (updatedDeadline !== null) {
			const updatedCaseFiles = await CaseFileService.getCaseFilesByFolderId(folderId);
			const body = JSON.stringify(updatedCaseFiles);
			const options = { status: 200 };
			return new Response(body, options);
		} else {
			throw new Error("There was an issue with updating the case file deadline.");
		}
	}

	static async deleteCaseFileById(request: Request) {
		const authHeader = request.headers.get("Authorization");
		if (!authHeader) {
			throw new Error("User is not authorized/signed in.");
		}
		const authToken = JSON.parse(authHeader);
		const userId: string = authToken.id;
		const urlArray = request.url.split("/");
		const folderId = urlArray[urlArray.length - 2];
		const fileId = urlArray[urlArray.length - 1];
		const deletedFile = await CaseFileService.deleteCaseFileById(userId, folderId, fileId);
		if (deletedFile) {
			const updatedCaseFiles = await CaseFileService.getCaseFilesByFolderId(folderId);
			const body = JSON.stringify(updatedCaseFiles);
			const options = { status: 200 };
			return new Response(body, options);
		} else {
			throw new Error("There was an issue with deleting the case file.");
		}
	}
}
