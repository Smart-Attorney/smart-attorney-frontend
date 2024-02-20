import { CreateFolderLabelDTO } from "../../../features/dashboard/api/create-folder-label";
import { FolderLabelDAO } from "../dao/folder-label-dao";

export class FolderLabelService {
	static async createFolderLabel(folderId: string, label: CreateFolderLabelDTO) {
		if (!folderId || !label) {
			return null;
		}
		const createdLabel = await FolderLabelDAO.addNewLabel(folderId, label);
		if (createdLabel !== null) {
			return createdLabel;
		}
		return null;
	}

	static async deleteFolderLabel(folderId: string, labelId: string) {
		if (!folderId || !labelId) {
			return null;
		}
		const deletedLabel = await FolderLabelDAO.deleteLabelById(folderId, labelId);
		if (deletedLabel !== null) {
			return deletedLabel;
		}
		return null;
	}
}
