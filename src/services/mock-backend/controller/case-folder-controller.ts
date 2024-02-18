import { CaseFolderService } from "../service/case-folder-service";

export class CaseFolderController {
	static async getAllCaseFolders(request: Request) {
		const userId = request.headers.get("Authorization");
		if (!userId) {
			throw new Error("Request does not contain a user identification.");
		}
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
		return request;
	}
}
