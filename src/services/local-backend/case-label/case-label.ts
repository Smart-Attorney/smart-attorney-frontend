/**
 * A class that models an object from the "case_label" database table.
 */
export class CaseLabel {
	private label_id: string;
	private label_name: string;
	private fk_case_id: string;

	constructor() {
		this.label_id = "";
		this.label_name = "";
		this.fk_case_id = "";
	}

	/* Getters */
	public getLabelId(): string {
		return this.label_id;
	}
	public getLabelName(): string {
		return this.label_name;
	}
	public getFkCaseId(): string {
		return this.fk_case_id;
	}

	/* Setters */
	public setLabelId(labelId: string): void {
		this.label_id = labelId;
	}
	public setLabelName(labelName: string): void {
		this.label_name = labelName;
	}
	public setFkCaseId(fkCaseId: string): void {
		this.fk_case_id = fkCaseId;
	}
}
