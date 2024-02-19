import { CaseFolderLabelObj } from "../../../utils/types";
import { FolderLabels } from "../../mock-sql/schemas";
import { MockSqlTables } from "../../mock-sql/tables";
import { DAO } from "./dao";

export class FolderLabelDAO extends DAO {
	static FOLDER_LABEL_STORAGE_KEY = MockSqlTables.FOLDER_LABELS;

	static async getAllFolderLabelsByCaseFolderId(caseFolderId: string) {
		const caseFolderLabels: CaseFolderLabelObj[] = [];
		const folderLabelArray: FolderLabels[] = await super.getArray(this.FOLDER_LABEL_STORAGE_KEY);
		for (let i = 0; i < folderLabelArray.length; i++) {
			if (folderLabelArray[i].case_folder_id_fk === caseFolderId) {
				caseFolderLabels.push({
					id: folderLabelArray[i].label_id,
					name: folderLabelArray[i].label_name,
				});
			}
		}
		return caseFolderLabels;
	}

	static async addNewLabel(label: string) {
		label;
	}
}
