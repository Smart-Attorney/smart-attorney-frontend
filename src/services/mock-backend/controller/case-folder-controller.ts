import { CaseFolderService } from "../service/case-folder-service";

export class CaseFolderController {
	static async getAllCaseFolders(request: Request) {
		const urlArray = request.url.split("/");
		const userId = urlArray[urlArray.length - 1];
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
}
