import { CreateFolderLabelDTO } from "../../../features/dashboard/api/create-folder-label";
import { CaseFolderService } from "../case-folder/case-folder-service";
import { FolderLabelService } from "./folder-label-service";

export class FolderLabelController {
	static async getAllCaseLabelsByUserId(request: Request) {
		const authHeader = request.headers.get("Authorization");
		if (!authHeader) throw new Error("User is not authorized/signed in.");
		const authToken = JSON.parse(authHeader);
		const userId: string = authToken.id;
		const userCaseLabels = await FolderLabelService.getAllCaseLabelsByUserId(userId);
		if (userCaseLabels !== null) {
			const body = JSON.stringify(userCaseLabels);
			const options = { status: 200 };
			return new Response(body, options);
		} else {
			throw new Error("There was an error with retrieving the case labels.");
		}
	}

	static async createFolderLabel(request: Request) {
		const authHeader = request.headers.get("Authorization");
		if (!authHeader) throw new Error("User is not authorized/signed in.");
		const authToken = JSON.parse(authHeader);
		const userId: string = authToken.id;
		const urlArray = request.url.split("/");
		const folderId: string = urlArray[urlArray.length - 1];
		const newLabel: CreateFolderLabelDTO = await request.json();
		const createdLabel = await FolderLabelService.createFolderLabel(folderId, newLabel);
		if (createdLabel !== null) {
			const updatedCaseFolders = await CaseFolderService.getAllCaseFoldersByUserId(userId);
			const body = JSON.stringify(updatedCaseFolders);
			const options = { status: 200 };
			return new Response(body, options);
		} else {
			throw new Error("There was an issue with creating the case folder label.");
		}
	}

	static async deleteFolderLabel(request: Request) {
		const authHeader = request.headers.get("Authorization");
		if (!authHeader) throw new Error("User is not authorized/signed in.");
		const authToken = JSON.parse(authHeader);
		const userId: string = authToken.id;
		const urlArray = request.url.split("/");
		const folderId: string = urlArray[urlArray.length - 2];
		const labelId: string = urlArray[urlArray.length - 1];
		const deletedLabel = await FolderLabelService.deleteFolderLabel(folderId, labelId);
		if (deletedLabel !== null) {
			const updatedCaseFolders = await CaseFolderService.getAllCaseFoldersByUserId(userId);
			const body = JSON.stringify(updatedCaseFolders);
			const options = { status: 200 };
			return new Response(body, options);
		} else {
			throw new Error("There was an issue with deleting the case folder label.");
		}
	}
}
