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
}
