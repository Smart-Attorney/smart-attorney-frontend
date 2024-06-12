import { nanoid } from "../../../lib/nanoid";
import { CaseFolderLabelObj } from "../../../utils/types";
import { FolderLabels } from "../../mock-sql/schemas";
import { MockSqlTables } from "../../mock-sql/tables";
import { DAO } from "../dao";

export class FolderLabelDAO extends DAO {
	private static FOLDER_LABEL_STORAGE_KEY = MockSqlTables.table.FOLDER_LABELS;

	static async getAllLabelsByCaseFolderId(caseFolderId: string) {
		const caseFolderLabels: CaseFolderLabelObj[] = [];
		const folderLabelArray: FolderLabels[] = await super.getArray(this.FOLDER_LABEL_STORAGE_KEY);
		for (let i = 0, n = folderLabelArray.length; i < n; i++) {
			if (folderLabelArray[i].case_folder_id_fk === caseFolderId) {
				caseFolderLabels.push({
					id: folderLabelArray[i].label_id,
					name: folderLabelArray[i].label_name,
				});
			}
		}
		return caseFolderLabels;
	}

	static async add(folderId: string, newLabelName: string): Promise<boolean> {
		const folderLabelArray: FolderLabels[] = await super.getArray(this.FOLDER_LABEL_STORAGE_KEY);
		const newLabel: FolderLabels = {
			label_id: nanoid(8),
			label_name: newLabelName,
			case_folder_id_fk: folderId,
		};
		const updatedArray = [...folderLabelArray, newLabel];
		const success = await super.setArray(this.FOLDER_LABEL_STORAGE_KEY, updatedArray);
		if (success) {
			return true;
		}
		return false;
	}

	static async deleteById(folderId: string, labelId: string): Promise<boolean> {
		const updatedArray: FolderLabels[] = [];
		const folderLabelArray: FolderLabels[] = await super.getArray(this.FOLDER_LABEL_STORAGE_KEY);
		for (let i = 0, n = folderLabelArray.length; i < n; i++) {
			if (folderLabelArray[i].case_folder_id_fk === folderId && folderLabelArray[i].label_id === labelId) {
				continue;
			}
			updatedArray.push(folderLabelArray[i]);
		}
		const success = await super.setArray(this.FOLDER_LABEL_STORAGE_KEY, updatedArray);
		if (success) {
			return true;
		}
		return false;
	}

	static async deleteAllLabelsByFolderId(folderId: string) {
		const updatedArray: FolderLabels[] = [];
		const folderLabelArray: FolderLabels[] = await super.getArray(this.FOLDER_LABEL_STORAGE_KEY);
		for (let i = 0, n = folderLabelArray.length; i < n; i++) {
			if (folderLabelArray[i].case_folder_id_fk === folderId) {
				continue;
			}
			updatedArray.push(folderLabelArray[i]);
		}
		const success = await super.setArray(this.FOLDER_LABEL_STORAGE_KEY, updatedArray);
		if (success) {
			return true;
		}
		return false;
	}
}
