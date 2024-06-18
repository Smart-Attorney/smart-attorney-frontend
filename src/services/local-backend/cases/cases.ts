/**
 * A class that models an object from the "cases" database table.
 */
export class Cases {
	private case_id: string;
	private case_name: string;
	private created_date: number;
	private last_opened_date: number;
	private is_open: boolean;
	private fk_user_id: string;

	constructor() {
		this.case_id = "";
		this.case_name = "";
		this.created_date = 0;
		this.last_opened_date = 0;
		this.is_open = true;
		this.fk_user_id = "";
	}

	/* Getters */
	public getCaseId(): string {
		return this.case_id;
	}
	public getCaseName(): string {
		return this.case_name;
	}
	public getCreatedDate(): number {
		return this.created_date;
	}
	public getLastOpenedDate(): number {
		return this.last_opened_date;
	}
	public getIsOpen(): boolean {
		return this.is_open;
	}
	public getFkUserId(): string {
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
