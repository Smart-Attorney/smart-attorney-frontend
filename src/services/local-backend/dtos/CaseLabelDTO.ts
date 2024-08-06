export class CaseLabelDTO {
	private id: string;
	private name: string;

	constructor() {
		this.id = "";
		this.name = "";
	}

	/* Getter */
	public getId(): string {
		return this.id;
	}
	public getName(): string {
		return this.name;
	}

	/* Setter */
	public setId(id: string): void {
		this.id = id;
	}
	public setName(name: string): void {
		this.name = name;
	}
}
