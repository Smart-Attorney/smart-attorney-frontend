import { nanoid } from "../../../lib/nanoid";
import { CaseFolderLabelObj } from "../../../utils/types";
import { FolderLabels } from "../../mock-sql/schemas";
import { MockSqlTables } from "../../mock-sql/tables";
import { DAO } from "../dao";

export class FolderLabelDAO extends DAO {
	private static FOLDER_LABEL_STORAGE_KEY = MockSqlTables.table.FOLDER_LABELS;

	static async getAllByCaseId(caseId: string): Promise<CaseFolderLabelObj[]> {
		const caseLabels: CaseFolderLabelObj[] = [];
		const labels: FolderLabels[] = await super.getArray(this.FOLDER_LABEL_STORAGE_KEY);
		for (let i = 0, n = labels.length; i < n; i++) {
			if (labels[i].case_folder_id_fk === caseId) {
				caseLabels.push({
					id: labels[i].label_id,
					name: labels[i].label_name,
				});
			}
		}
		return caseLabels;
	}

	static async add(caseId: string, newLabelName: string): Promise<boolean> {
		const labels: FolderLabels[] = await super.getArray(this.FOLDER_LABEL_STORAGE_KEY);
		const newLabel: FolderLabels = {
			label_id: nanoid(8),
			label_name: newLabelName,
			case_folder_id_fk: caseId,
		};
		const updatedArray = [...labels, newLabel];
		const success = await super.setArray(this.FOLDER_LABEL_STORAGE_KEY, updatedArray);
		if (success) {
			return true;
		}
		return false;
	}

	static async deleteById(caseId: string, labelId: string): Promise<boolean> {
		const updatedArray: FolderLabels[] = [];
		const labels: FolderLabels[] = await super.getArray(this.FOLDER_LABEL_STORAGE_KEY);
		for (let i = 0, n = labels.length; i < n; i++) {
			if (labels[i].case_folder_id_fk === caseId && labels[i].label_id === labelId) {
				continue;
			}
			updatedArray.push(labels[i]);
		}
		const success = await super.setArray(this.FOLDER_LABEL_STORAGE_KEY, updatedArray);
		if (success) {
			return true;
		}
		return false;
	}

	static async deleteAllByCaseId(caseId: string): Promise<boolean> {
		const updatedArray: FolderLabels[] = [];
		const labels: FolderLabels[] = await super.getArray(this.FOLDER_LABEL_STORAGE_KEY);
		for (let i = 0, n = labels.length; i < n; i++) {
			if (labels[i].case_folder_id_fk === caseId) {
				continue;
			}
			updatedArray.push(labels[i]);
		}
		const success = await super.setArray(this.FOLDER_LABEL_STORAGE_KEY, updatedArray);
		if (success) {
			return true;
		}
		return false;
	}
}
