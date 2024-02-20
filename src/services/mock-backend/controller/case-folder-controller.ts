import { CreateCaseFolderDTO } from "../../../features/create-case-folder/api/create-case-folder";
import { UpdateDeadlineDTO } from "../../../features/dashboard/api/update-deadline";
import { CaseFolderService } from "../service/case-folder-service";

export class CaseFolderController {
	static async getAllUserCaseFolders(request: Request) {
		const authHeader = request.headers.get("Authorization");
		if (!authHeader) {
			throw new Error("User is not authorized/signed in.");
		}
		const authToken = JSON.parse(authHeader);
		const userId: string = authToken.id;
		const userCaseFolders = await CaseFolderService.getAllUserCaseFoldersById(userId);
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

	static async createCaseFolder(request: Request) {
		const authHeader = request.headers.get("Authorization");
		if (!authHeader) {
			throw new Error("User is not authorized/signed in.");
		}
		const authToken = JSON.parse(authHeader);
		const userId: string = authToken.id;
		const folderObj: CreateCaseFolderDTO = await request.json();
		const createdCaseFolder = await CaseFolderService.createCaseFolder(userId, folderObj);
		if (createdCaseFolder) {
			const body = JSON.stringify(createdCaseFolder);
			const options = { status: 200 };
			return new Response(body, options);
		} else {
			throw new Error("There was an issue with creating the case folder.");
		}
	}

	static async updateCaseFolderDeadline(request: Request) {
		const authHeader = request.headers.get("Authorization");
		if (!authHeader) {
			throw new Error("User is not authorized/signed in.");
		}
		const authToken = JSON.parse(authHeader);
		const userId: string = authToken.id;
		const urlArray = request.url.split("/");
		const folderId: string = urlArray[urlArray.length - 1];
		const newDeadline: UpdateDeadlineDTO = await request.json();
		const updatedDeadline = await CaseFolderService.updateCaseFolderDeadline(folderId, newDeadline);
		if (updatedDeadline !== null) {
			const updatedCaseFolders = await CaseFolderService.getAllUserCaseFoldersById(userId);
			const body = JSON.stringify(updatedCaseFolders);
			const options = { status: 200 };
			return new Response(body, options);
		} else {
			throw new Error("There was an issue with updating the case folder deadline.");
		}
	}

	static async deleteCaseFolder(request: Request) {
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
			const updatedCaseFolders = await CaseFolderService.getAllUserCaseFoldersById(userId);
			const body = JSON.stringify(updatedCaseFolders);
			const options = { status: 200 };
			return new Response(body, options);
		} else {
			throw new Error("There was an issue with deleting the case folder.");
		}
	}
}
