import { CaseLabelDTO } from "./CaseLabelDTO";
import { DocumentDTO } from "./DocumentDTO";

export class CaseDTO {
	private id: string;
	private name: string;
	private createdDate: number;
	private lastOpenedDate: number;
	private status: boolean;
	private urgentDocumentDeadline: number;
	private labels: CaseLabelDTO[];
	private documents: DocumentDTO[];

	constructor() {
		this.id = "";
		this.name = "";
		this.createdDate = 0;
		this.lastOpenedDate = 0;
		this.status = true;
		this.urgentDocumentDeadline = 0;
		this.labels = [];
		this.documents = [];
	}

	/* Getter */
	public getId(): string {
		return this.id;
	}
	public getName(): string {
		return this.name;
	}
	public getCreatedDate(): number {
		return this.createdDate;
	}
	public getLastOpenedDate(): number {
		return this.lastOpenedDate;
	}
	public getStatus(): boolean {
		return this.status;
	}
	public getUrgentDocumentDeadline(): number {
		return this.urgentDocumentDeadline;
	}
	public getLabels(): CaseLabelDTO[] {
		return this.labels;
	}
	public getDocuments(): DocumentDTO[] {
		return this.documents;
	}

	/* Setter */
	public setId(id: string): void {
		this.id = id;
	}
	public setName(name: string): void {
		this.name = name;
	}
	public setCreatedDate(createdDate: number): void {
		this.createdDate = createdDate;
	}
	public setLastOpenedDate(lastOpenedDate: number): void {
		this.lastOpenedDate = lastOpenedDate;
	}
	public setStatus(status: boolean): void {
		this.status = status;
	}
	public setUrgentDocumentDeadline(urgentDocumentDeadline: number): void {
		this.urgentDocumentDeadline = urgentDocumentDeadline;
	}
	public setLabels(labels: CaseLabelDTO[]): void {
		this.labels = labels;
	}
	public setDocuments(documents: DocumentDTO[]): void {
		this.documents = documents;
	}
}
