import { CaseFileService } from "../service/case-file-service";
import { CaseFolderService } from "../service/case-folder-service";

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
			const updatedCaseFolder = await CaseFolderService.getCaseFolderById(folderId);
			const body = JSON.stringify(updatedCaseFolder);
			const options = { status: 200 };
			return new Response(body, options);
		} else {
			throw new Error("There was an issue with deleting the case file.");
		}
	}
}
