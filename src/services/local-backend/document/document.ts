import { document_status } from "../../local-database/entities";

/**
 * A class that models an object from the "document" database table.
 */
export class Document {
	private document_id: string;
	private document_name: string;
	private created_date: number;
	private last_opened_date: number;
	private status: document_status;
	private deadline: number;
	private url: string;
	private fk_case_id: string;

	constructor() {
		this.document_id = "";
		this.document_name = "";
		this.created_date = 0;
		this.last_opened_date = 0;
		this.status = "In Progress";
		this.deadline = 0;
		this.url = "";
		this.fk_case_id = "";
	}

	/* Getter */
	public getDocumentId(): string {
		return this.document_id;
	}
	public getDocumentName(): string {
		return this.document_name;
	}
	public getCreatedDate(): number {
		return this.created_date;
	}
	public getLastOpenedDate(): number {
		return this.last_opened_date;
	}
	public getStatus(): document_status {
		return this.status;
	}
	public getDeadline(): number {
		return this.deadline;
	}
	public getUrl(): string {
		return this.url;
	}
	public getFkCaseId(): string {
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
