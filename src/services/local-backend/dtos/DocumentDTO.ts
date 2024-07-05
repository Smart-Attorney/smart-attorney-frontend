import { DocumentStatus } from "../../../utils/types";

export class DocumentDTO {
	private id: string;
	private name: string;
	private createdDate: number;
	private lastOpenedDate: number;
	private status: DocumentStatus;
	private deadline: number;
	private url: string;

	constructor() {
		this.id = "";
		this.name = "";
		this.createdDate = 0;
		this.lastOpenedDate = 0;
		this.status = "In Progress";
		this.deadline = 0;
		this.url = "";
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
	public getStatus(): DocumentStatus {
		return this.status;
	}
	public getDeadline(): number {
		return this.deadline;
	}
	public getUrl(): string {
		return this.url;
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
	public setStatus(status: DocumentStatus): void {
		this.status = status;
	}
	public setDeadline(deadline: number): void {
		this.deadline = deadline;
	}
	public setUrl(url: string): void {
		this.url = url;
	}
}
