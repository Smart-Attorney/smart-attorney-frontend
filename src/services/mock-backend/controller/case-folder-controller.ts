import { CreateCaseFolderDTO } from "../../../features/create-case-folder/api/create-case-folder";
import { CaseFolderService } from "../service/case-folder-service";

export class CaseFolderController {
	static async getAllCaseFolders(request: Request) {
		const authHeader = request.headers.get("Authorization");
		if (!authHeader) {
			throw new Error("User is not authorized/signed in.");
		}
		const authToken = JSON.parse(authHeader);
		const userId: string = authToken.id;
		const userCaseFolders = await CaseFolderService.getAllCaseFolders(userId);
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
}
