import { UpdateCaseFolderNameDTO } from "../../../features/case-folder/api/update-case-folder-name";
import { UpdateCaseFolderLastOpenedDateDTO } from "../../../features/case-folder/api/update-last-opened-date";
import { CreateCaseFolderDTO } from "../../../features/create-case-folder/api/create-case-folder";
import { CaseFolderService } from "./case-folder-service";

export class CaseFolderController {
	static async getUserCaseFolders(request: Request): Promise<Response> {
		const authHeader = request.headers.get("Authorization");
		if (!authHeader) {
			throw new Error("User is not authorized/signed in.");
		}
		const authToken = JSON.parse(authHeader);
		const userId: string = authToken.id;
		const userCaseFolders = await CaseFolderService.getAllCaseFoldersByUserId(userId);
		if (userCaseFolders !== null) {
			const body = JSON.stringify(userCaseFolders);
			const options = { status: 200 };
			return new Response(body, options);
		} else {
			const body = null;
			const options = { status: 204, statusText: "No case folders exist for this user." };
			return new Response(body, options);
		}
	}

	static async getCaseFolder(request: Request): Promise<Response> {
		const urlArray = request.url.split("/");
		const folderId: string = urlArray[urlArray.length - 1];
		const retrievedCaseFolder = await CaseFolderService.getCaseFolderById(folderId);
		if (retrievedCaseFolder !== null) {
			const body = JSON.stringify(retrievedCaseFolder);
			const options = { status: 200 };
			return new Response(body, options);
		} else {
			throw new Error("There was an issue with retrieving the case folder.");
		}
	}

	static async createCaseFolder(request: Request): Promise<Response> {
		const authHeader = request.headers.get("Authorization");
		if (!authHeader) {
			throw new Error("User is not authorized/signed in.");
		}
		const authToken = JSON.parse(authHeader);
		const userId: string = authToken.id;
		const newFolder: CreateCaseFolderDTO = await request.json();
		const { folderId, folderName } = newFolder;
		const createdCaseFolder = await CaseFolderService.createCaseFolder(userId, folderId, folderName);
		if (createdCaseFolder !== null) {
			const body = JSON.stringify(createdCaseFolder);
			const options = { status: 200 };
			return new Response(body, options);
		} else {
			throw new Error("There was an issue with creating the case folder.");
		}
	}

	static async createLabel(request: Request): Promise<Response> {
		const authHeader = request.headers.get("Authorization");
		if (!authHeader) {
			throw new Error("User is not authorized/signed in.");
		}
		const authToken = JSON.parse(authHeader);
		const userId: string = authToken.id;
		const urlArray = request.url.split("/");
		const folderId: string = urlArray[urlArray.length - 1];
		const newLabel: string = await request.json();
		const caseWithNewLabel = await CaseFolderService.createLabel(userId, folderId, newLabel);
		if (caseWithNewLabel !== null) {
			const body = JSON.stringify(caseWithNewLabel);
			const options = { status: 200 };
			return new Response(body, options);
		} else {
			throw new Error("There was an issue with creating the case folder label.");
		}
	}

	static async updateLastOpenedDate(request: Request): Promise<Response> {
		const authHeader = request.headers.get("Authorization");
		if (!authHeader) {
			throw new Error("User is not authorized/signed in.");
		}
		const authToken = JSON.parse(authHeader);
		const userId: string = authToken.id;
		const urlArray = request.url.split("/");
		const folderId: string = urlArray[urlArray.length - 1];
		const newDate: UpdateCaseFolderLastOpenedDateDTO = await request.json();
		const updatedDate = await CaseFolderService.updateLastOpenedDate(userId, folderId, newDate);
		if (updatedDate !== null) {
			const updatedCaseFolders = await CaseFolderService.getAllCaseFoldersByUserId(userId);
			const body = JSON.stringify(updatedCaseFolders);
			const options = { status: 200 };
			return new Response(body, options);
		} else {
			throw new Error("There was an issue with updating the case folder last opened date.");
		}
	}

	static async updateName(request: Request): Promise<Response> {
		const authHeader = request.headers.get("Authorization");
		if (!authHeader) {
			throw new Error("User is not authorized/signed in.");
		}
		const authToken = JSON.parse(authHeader);
		const userId: string = authToken.id;
		const urlArray = request.url.split("/");
		const folderId: string = urlArray[urlArray.length - 1];
		const newName: UpdateCaseFolderNameDTO = await request.json();
		const caseWithUpdatedName = await CaseFolderService.updateName(userId, folderId, newName);
		if (caseWithUpdatedName !== null) {
			const body = JSON.stringify(caseWithUpdatedName);
			const options = { status: 200 };
			return new Response(body, options);
		} else {
			throw new Error("There was an issue with updating the case folder name.");
		}
	}

	static async updateStatus(request: Request): Promise<Response> {
		const authHeader = request.headers.get("Authorization");
		if (!authHeader) {
			throw new Error("User is not authorized/signed in.");
		}
		const authToken = JSON.parse(authHeader);
		const userId: string = authToken.id;
		const urlArray = request.url.split("/");
		const folderId: string = urlArray[urlArray.length - 1];
		const currentStatus: boolean = await request.json();
		const caseWithUpdatedStatus = await CaseFolderService.updateStatus(userId, folderId, currentStatus);
		if (caseWithUpdatedStatus !== null) {
			const body = JSON.stringify(caseWithUpdatedStatus);
			const options = { status: 200 };
			return new Response(body, options);
		} else {
			throw new Error("There was an issue with updating the case folder status.");
		}
	}

	static async deleteCaseLabel(request: Request): Promise<Response> {
		const authHeader = request.headers.get("Authorization");
		if (!authHeader) throw new Error("User is not authorized/signed in.");
		const authToken = JSON.parse(authHeader);
		const userId: string = authToken.id;
		const urlArray = request.url.split("/");
		const folderId: string = urlArray[urlArray.length - 2];
		const labelId: string = urlArray[urlArray.length - 1];
		const caseWithDeletedLabel = await CaseFolderService.deleteLabel(userId, folderId, labelId);
		if (caseWithDeletedLabel !== null) {
			const body = JSON.stringify(caseWithDeletedLabel);
			const options = { status: 200 };
			return new Response(body, options);
		} else {
			throw new Error("There was an issue with deleting the case folder label.");
		}
	}

	static async deleteCaseFolder(request: Request): Promise<Response> {
		const authHeader = request.headers.get("Authorization");
		if (!authHeader) {
			throw new Error("User is not authorized/signed in.");
		}
		const authToken = JSON.parse(authHeader);
		const userId: string = authToken.id;
		const urlArray = request.url.split("/");
		const folderId: string = urlArray[urlArray.length - 1];
		const deletedCaseFolder = await CaseFolderService.deleteCaseFolder(userId, folderId);
		if (deletedCaseFolder !== null) {
			const updatedCaseFolders = await CaseFolderService.getAllCaseFoldersByUserId(userId);
			const body = JSON.stringify(updatedCaseFolders);
			const options = { status: 200 };
			return new Response(body, options);
		} else {
			throw new Error("There was an issue with deleting the case folder.");
		}
	}
}
