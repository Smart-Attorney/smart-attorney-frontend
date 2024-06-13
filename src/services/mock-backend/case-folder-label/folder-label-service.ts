import { CaseFolderLabelObj } from "../../../utils/types";
import { CaseFolderService } from "../case-folder/case-folder-service";
import { FolderLabelDAO } from "./folder-label-dao";

export class FolderLabelService {
	static async getAllByUserId(userId: string): Promise<CaseFolderLabelObj[] | null> {
		if (!userId) return null;
		let userCaseLabels: CaseFolderLabelObj[] = [];
		const userCases = await CaseFolderService.getAllByUserId(userId);
		for (let i = 0, n = userCases.length; i < n; i++) {
			const caseLabels = await FolderLabelDAO.getAllByCaseId(userCases[i].id);
			userCaseLabels = [...userCaseLabels, ...caseLabels];
		}
		return userCaseLabels;
	}
}
