/**
 * A class that models an object from the "cases" database table.
 */
export class Cases {
	private case_id: string | null;
	private case_name: string | null;
	private created_date: number | null;
	private last_opened_date: number | null;
	private is_open: boolean | null;
	private fk_user_id: string | null;

	constructor() {
		this.case_id = null;
		this.case_name = null;
		this.created_date = null;
		this.last_opened_date = null;
		this.is_open = null;
		this.fk_user_id = null;
	}

	/* Getters */
	public getCaseId(): string | null {
		return this.case_id;
	}

	public getCaseName(): string | null {
		return this.case_name;
	}

	public getCreatedDate(): number | null {
		return this.created_date;
	}

	public getLastOpenedDate(): number | null {
		return this.last_opened_date;
	}

	public getIsOpen(): boolean | null {
		return this.is_open;
	}

	public getFkUserId(): string | null {
		return this.fk_user_id;
	}

	/* Setters */
	public setCaseId(caseId: string): void {
		this.case_id = caseId;
	}

	public setCaseName(caseName: string): void {
		this.case_name = caseName;
	}

	public setCreatedDate(createdDate: number): void {
		this.created_date = createdDate;
	}

	public setLastOpenedDate(lastOpenedDate: number): void {
		this.last_opened_date = lastOpenedDate;
	}

	public setIsOpen(status: boolean): void {
		this.is_open = status;
	}

	public setFkUserId(fkUserId: string): void {
		this.fk_user_id = fkUserId;
	}
}