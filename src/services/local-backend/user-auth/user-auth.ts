/**
 * A class that models an object from the "auth_user" database table.
 */
export class UserAuth {
	private user_auth_id: string;
	private company_email: string;
	private salt: string;
	private password_hash: string;

	constructor() {
		this.user_auth_id = "";
		this.company_email = "";
		this.salt = "";
		this.password_hash = "";
	}

	/* Getters */
	public getUserAuthId(): string {
		return this.user_auth_id;
	}

	public getCompanyEmail(): string {
		return this.company_email;
	}

	public getSalt(): string {
		return this.salt;
	}

	public getPasswordHash(): string {
		return this.password_hash;
	}

	/* Setters */
	public setUserAuthId(userAuthId: string): void {
		this.user_auth_id = userAuthId;
	}

	public setCompanyEmail(companyEmail: string): void {
		this.company_email = companyEmail;
	}

	public setSalt(salt: string): void {
		this.salt = salt;
	}

	public setPasswordHash(passwordHash: string): void {
		this.password_hash = passwordHash;
	}
}
