import { Uuid } from "../../../lib/uuid";
import { DatabaseConnection } from "../../local-database/database-connection";
import { CaseLabelEntity } from "../../local-database/entities";
import { SqlTables } from "../../local-database/sql-tables";

export class CaseLabelDAO {
	private CASE_LABEL_KEY = SqlTables.TABLE.CASE_LABEL;
	private dbConn: DatabaseConnection;
	private uuid: Uuid;

	constructor() {
		this.dbConn = new DatabaseConnection();
		this.uuid = new Uuid();
	}

	public async getAllByCaseId(caseUuid: string): Promise<CaseLabelEntity[]> {
		const caseLabels: CaseLabelEntity[] = [];
		const labels: CaseLabelEntity[] = await this.dbConn.getArray(this.CASE_LABEL_KEY);
		for (let i = 0, n = labels.length; i < n; i++) {
			if (labels[i].fk_case_id === caseUuid) {
				caseLabels.push(labels[i]);
			}
		}
		return caseLabels;
	}

	public async get(labelUuid: string): Promise<CaseLabelEntity | null> {
		const labels: CaseLabelEntity[] = await this.dbConn.getArray(this.CASE_LABEL_KEY);
		for (let i = 0, n = labels.length; i < n; i++) {
			if (labels[i].label_id === labelUuid) {
				return labels[i];
			}
		}
		return null;
	}

	public async save(caseUuid: string, labelName: string): Promise<string | null> {
		const labels: CaseLabelEntity[] = await this.dbConn.getArray(this.CASE_LABEL_KEY);
		const newLabel: CaseLabelEntity = {
			label_id: this.uuid.generate(),
			label_name: labelName,
			fk_case_id: caseUuid,
		};
		const newLabelsArr = [...labels, newLabel];
		const success = await this.dbConn.setArray(this.CASE_LABEL_KEY, newLabelsArr);
		if (success) {
			return newLabel.label_id;
		}
		return null;
	}

	public async deleteAllByCaseId(caseUuid: string): Promise<boolean> {
		const newLabelsArr: CaseLabelEntity[] = [];
		const labels: CaseLabelEntity[] = await this.dbConn.getArray(this.CASE_LABEL_KEY);
		for (let i = 0, n = labels.length; i < n; i++) {
			if (labels[i].fk_case_id === caseUuid) {
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

	public async delete(labelUuid: string): Promise<boolean> {
		const newLabelsArr: CaseLabelEntity[] = [];
		const labels: CaseLabelEntity[] = await this.dbConn.getArray(this.CASE_LABEL_KEY);
		for (let i = 0, n = labels.length; i < n; i++) {
			if (labels[i].label_id === labelUuid) {
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
