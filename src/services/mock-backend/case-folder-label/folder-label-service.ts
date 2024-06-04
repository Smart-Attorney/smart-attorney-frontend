import { CreateFolderLabelDTO } from "../../../features/dashboard/api/create-folder-label";
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

	static async createFolderLabel(folderId: string, label: CreateFolderLabelDTO) {
		if (!folderId || !label) return null;
		const createdLabel = await FolderLabelDAO.addNewLabel(folderId, label);
		if (createdLabel !== null) return createdLabel;
		return null;
	}

	static async deleteFolderLabel(folderId: string, labelId: string) {
		if (!folderId || !labelId) return null;
		const deletedLabel = await FolderLabelDAO.deleteLabelById(folderId, labelId);
		if (deletedLabel !== null) return deletedLabel;
		return null;
	}
}
