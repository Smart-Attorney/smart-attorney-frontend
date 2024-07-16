import { nanoid } from "../../../lib/nanoid";
import { CaseLabelObj } from "../../../types/api";
import { DatabaseConnection } from "../../local-database/database-connection";
import { CaseLabelEntity } from "../../local-database/entities";
import { SqlTables } from "../../local-database/sql-tables";

export class CaseLabelDAO {
	private CASE_LABEL_KEY = SqlTables.TABLE.CASE_LABEL;
	private dbConn: DatabaseConnection;

	constructor() {
		this.dbConn = new DatabaseConnection();
	}

	public async getAllByCaseId(caseId: string): Promise<CaseLabelObj[]> {
		const caseLabels: CaseLabelObj[] = [];
		const labels: CaseLabelEntity[] = await this.dbConn.getArray(this.CASE_LABEL_KEY);
		for (let i = 0, n = labels.length; i < n; i++) {
			if (labels[i].fk_case_id === caseId) {
				caseLabels.push({
					id: labels[i].label_id,
					name: labels[i].label_name,
				});
			}
		}
		return caseLabels;
	}

	public async get(labelId: string): Promise<CaseLabelObj | null> {
		const labels: CaseLabelEntity[] = await this.dbConn.getArray(this.CASE_LABEL_KEY);
		for (let i = 0, n = labels.length; i < n; i++) {
			if (labels[i].label_id === labelId) {
				const caseLabel: CaseLabelObj = {
					id: labels[i].label_id,
					name: labels[i].label_name,
				};
				return caseLabel;
			}
		}
		return null;
	}

	public async save(caseId: string, labelName: string): Promise<CaseLabelEntity | null> {
		const labels: CaseLabelEntity[] = await this.dbConn.getArray(this.CASE_LABEL_KEY);
		const newLabel: CaseLabelEntity = {
			label_id: nanoid(20),
			label_name: labelName,
			fk_case_id: caseId,
		};
		const newLabelsArr = [...labels, newLabel];
		const success = await this.dbConn.setArray(this.CASE_LABEL_KEY, newLabelsArr);
		if (success) {
			return newLabel;
		}
		return null;
	}

	public async deleteAllByCaseId(caseId: string): Promise<boolean> {
		const newLabelsArr: CaseLabelEntity[] = [];
		const labels: CaseLabelEntity[] = await this.dbConn.getArray(this.CASE_LABEL_KEY);
		for (let i = 0, n = labels.length; i < n; i++) {
			if (labels[i].fk_case_id === caseId) {
				continue;
			}
			newLabelsArr.push(labels[i]);
		}
		const success = await this.dbConn.setArray(this.CASE_LABEL_KEY, newLabelsArr);
		if (success) {
			return true;
		}
		return false;
	}

	public async delete(caseId: string, labelId: string): Promise<boolean> {
		const newLabelsArr: CaseLabelEntity[] = [];
		const labels: CaseLabelEntity[] = await this.dbConn.getArray(this.CASE_LABEL_KEY);
		for (let i = 0, n = labels.length; i < n; i++) {
			if (labels[i].fk_case_id === caseId && labels[i].label_id === labelId) {
				continue;
			}
			newLabelsArr.push(labels[i]);
		}
		const success = await this.dbConn.setArray(this.CASE_LABEL_KEY, newLabelsArr);
		if (success) {
			return true;
		}
		return false;
	}
}
