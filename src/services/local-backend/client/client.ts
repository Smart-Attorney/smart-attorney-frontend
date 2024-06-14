import { sex_options } from "../../local-database/entities";

/**
 * A class that models an object from the "client" database table.
 */
export class Client {
	private client_id: string | null;
	private first_name: string | null;
	private middle_name: string | null;
	private last_name: string | null;
	private date_of_birth: number | null;
	private sex: sex_options | null;
	private country_of_citizenship: string | null;
	private primary_language: string | null;
	private fk_case_id: string | null;

	constructor() {
		this.client_id = null;
		this.first_name = null;
		this.middle_name = null;
		this.last_name = null;
		this.date_of_birth = null;
		this.sex = null;
		this.country_of_citizenship = null;
		this.primary_language = null;
		this.fk_case_id = null;
	}

	/* Getters */
	public getClientId(): string | null {
		return this.client_id;
	}

	public getFirstName(): string | null {
		return this.first_name;
	}

	public getMiddleName(): string | null {
		return this.middle_name;
	}

	public getLastName(): string | null {
		return this.last_name;
	}

	public getDateOfBirth(): number | null {
		return this.date_of_birth;
	}

	public getSex(): sex_options | null {
		return this.sex;
	}

	public getCountryOfCitizenship(): string | null {
		return this.country_of_citizenship;
	}

	public getPrimaryLanguage(): string | null {
		return this.primary_language;
	}

	public getFkCaseId(): string | null {
		return this.fk_case_id;
	}

	/* Setters */
	public setClientId(clientId: string): void {
		this.client_id = clientId;
	}

	public setFirstName(firstName: string): void {
		this.first_name = firstName;
	}

	public setMiddleName(middleName: string): void {
		this.middle_name = middleName;
	}

	public setLastName(lastName: string): void {
		this.last_name = lastName;
	}

	public setDateOfBirth(dateOfBirth: number): void {
		this.date_of_birth = dateOfBirth;
	}

	public setSex(sex: sex_options): void {
		this.sex = sex;
	}

	public setCountryOfCitizenship(countryOfCitizenship: string): void {
		this.country_of_citizenship = countryOfCitizenship;
	}

	public setPrimaryLanguage(primaryLanguage: string): void {
		this.primary_language = primaryLanguage;
	}

	public setFkCaseId(fkCaseId: string): void {
		this.fk_case_id = fkCaseId;
	}
}
