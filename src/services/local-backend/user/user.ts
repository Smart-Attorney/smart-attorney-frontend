/**
 * A class that models an object from the "user" database table.
 */
export class User {
	private user_id: string | null;
	private first_name: string | null;
	private last_name: string | null;
	private firm_name: string | null;
	private company_email: string | null;
	private email: string | null;
	private password: string | null;

	constructor() {
		this.user_id = null;
		this.first_name = null;
		this.last_name = null;
		this.firm_name = null;
		this.company_email = null;
		this.email = null;
		this.password = null;
	}

	/* Getters */
	public getUserId(): string | null {
		return this.user_id;
	}

	public getFirstName(): string | null {
		return this.first_name;
	}

	public getLastName(): string | null {
		return this.last_name;
	}

	public getFirmName(): string | null {
		return this.firm_name;
	}

	public getCompanyEmail(): string | null {
		return this.company_email;
	}

	public getEmail(): string | null {
		return this.email;
	}

	public getPassword(): string | null {
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
