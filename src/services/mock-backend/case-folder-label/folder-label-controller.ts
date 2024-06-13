import { FolderLabelService } from "./folder-label-service";

export class FolderLabelController {
	static async getAll(request: Request): Promise<Response> {
		const authHeader = request.headers.get("Authorization");
		if (!authHeader) {
			throw new Error("User is not authorized/signed in.");
		}
		const authToken = JSON.parse(authHeader);
		const userId: string = authToken.id;
		const userCaseLabels = await FolderLabelService.getAllByUserId(userId);
		if (userCaseLabels !== null) {
			const body = JSON.stringify(userCaseLabels);
			const options = { status: 200 };
			return new Response(body, options);
		} else {
			throw new Error("There was an error with retrieving the case labels.");
		}
	}
}
