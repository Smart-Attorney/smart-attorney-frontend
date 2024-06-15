import { document_status } from "../../local-database/entities";

/**
 * A class that models an object from the "document" database table.
 */
export class Document {
	private document_id: string | null;
	private document_name: string | null;
	private created_date: number | null;
	private last_opened_date: number | null;
	private status: document_status | null;
	private deadline: number | null;
	private url: string | null;
	private fk_case_id: string | null;

	constructor() {
		this.document_id = null;
		this.document_name = null;
		this.created_date = null;
		this.last_opened_date = null;
		this.status = null;
		this.deadline = null;
		this.url = null;
		this.fk_case_id = null;
	}

	/* Getter */
	public getDocumentId(): string | null {
		return this.document_id;
	}

	public getDocumentName(): string | null {
		return this.document_name;
	}

	public getCreatedDate(): number | null {
		return this.created_date;
	}

	public getLastOpenedDate(): number | null {
		return this.last_opened_date;
	}

	public getStatus(): document_status | null {
		return this.status;
	}

	public getDeadline(): number | null {
		return this.deadline;
	}

	public getUrl(): string | null {
		return this.url;
	}

	public getFkCaseId(): string | null {
		return this.fk_case_id;
	}

	/* Setter */
	public setDocumentId(documentId: string): void {
		this.document_id = documentId;
	}

	public setDocumentName(documentName: string): void {
		this.document_name = documentName;
	}

	public setCreatedDate(createdDate: number): void {
		this.created_date = createdDate;
	}

	public setLastOpenedDate(lastOpenedDate: number): void {
		this.last_opened_date = lastOpenedDate;
	}

	public setStatus(status: document_status): void {
		this.status = status;
	}

	public setDeadline(deadline: number): void {
		this.deadline = deadline;
	}

	public setUrl(url: string): void {
		this.url = url;
	}

	public setFkCaseId(fkCaseId: string): void {
		this.fk_case_id = fkCaseId;
	}
}
