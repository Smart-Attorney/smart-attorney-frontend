/**
 * A class that models an object from the "case_label" database table.
 */
export class CaseLabel {
	private label_id: string | null;
	private label_name: string | null;
	private fk_case_id: string | null;

	constructor() {
		this.label_id = null;
		this.label_name = null;
		this.fk_case_id = null;
	}

	/* Getters */
	public getLabelId(): string | null {
		return this.label_id;
	}

	public getLabelName(): string | null {
		return this.label_name;
	}

	public getFkCaseId(): string | null {
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
