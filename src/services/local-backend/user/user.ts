/**
 * A class that models an object from the "user" database table.
 */
export class User {
	private user_id: string;
	private first_name: string;
	private last_name: string;
	private firm_name: string;
	private company_email: string;
	private email: string;
	private password: string;

	constructor() {
		this.user_id = "";
		this.first_name = "";
		this.last_name = "";
		this.firm_name = "";
		this.company_email = "";
		this.email = "";
		this.password = "";
	}

	/* Getters */
	public getUserId(): string {
		return this.user_id;
	}
	public getFirstName(): string {
		return this.first_name;
	}
	public getLastName(): string {
		return this.last_name;
	}
	public getFirmName(): string {
		return this.firm_name;
	}
	public getCompanyEmail(): string {
		return this.company_email;
	}
	public getEmail(): string {
		return this.email;
	}
	public getPassword(): string {
		return this.password;
	}

	/* Setters */
	public setUserId(userId: string): void {
		this.user_id = userId;
	}
	public setFirstName(firstName: string): void {
		this.first_name = firstName;
	}
	public setLastName(lastName: string): void {
		this.last_name = lastName;
	}
	public setFirmName(firmName: string): void {
		this.firm_name = firmName;
	}
	public setCompanyEmail(companyEmail: string): void {
		this.company_email = companyEmail;
	}
	public setEmail(email: string): void {
		this.email = email;
	}
	public setPassword(password: string): void {
		this.password = password;
	}
}
