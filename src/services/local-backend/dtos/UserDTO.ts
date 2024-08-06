export class UserDTO {
	private id: string;
	private firstName: string;
	private lastName: string;
	private firmName: string;
	private companyEmail: string;
	private email: string;
	private password: string;

	constructor() {
		this.id = "";
		this.firstName = "";
		this.lastName = "";
		this.firmName = "";
		this.companyEmail = "";
		this.email = "";
		this.password = "";
	}

	/* Getter */
	public getId(): string {
		return this.id;
	}
	public getFirstName(): string {
		return this.firstName;
	}
	public getLastName(): string {
		return this.lastName;
	}
	public getFirmName(): string {
		return this.firmName;
	}
	public getCompanyEmail(): string {
		return this.companyEmail;
	}
	public getEmail(): string {
		return this.email;
	}
	public getPassword(): string {
		return this.password;
	}

	/* Setter */
	public setId(id: string): void {
		this.id = id;
	}
	public setFirstName(firstName: string): void {
		this.firstName = firstName;
	}
	public setLastName(lastName: string): void {
		this.lastName = lastName;
	}
	public setFirmName(firmName: string): void {
		this.firmName = firmName;
	}
	public setCompanyEmail(companyEmail: string): void {
		this.companyEmail = companyEmail;
	}
	public setEmail(email: string): void {
		this.email = email;
	}
	public setPassword(password: string): void {
		this.password = password;
	}
}
