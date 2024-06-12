import { CaseFolderLabelObj } from "../../../utils/types";
import { CaseFolderService } from "../case-folder/case-folder-service";
import { FolderLabelDAO } from "./folder-label-dao";

export class FolderLabelService {
	static async getAllCaseLabelsByUserId(userId: string) {
		if (!userId) return null;
		let userCaseLabels: CaseFolderLabelObj[] = [];
		const userCaseFolders = await CaseFolderService.getAllCaseFoldersByUserId(userId);
		for (let i = 0, n = userCaseFolders.length; i < n; i++) {
			const caseLabels = await FolderLabelDAO.getAllLabelsByCaseFolderId(userCaseFolders[i].id);
			userCaseLabels = [...userCaseLabels, ...caseLabels];
		}
		return userCaseLabels;
	}
}
