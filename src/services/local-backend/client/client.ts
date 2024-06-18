import { sex_option } from "../../local-database/entities";

/**
 * A class that models an object from the "client" database table.
 */
export class Client {
	private client_id: string;
	private first_name: string;
	private middle_name: string;
	private last_name: string;
	private date_of_birth: number;
	private sex: sex_option;
	private country_of_citizenship: string;
	private primary_language: string;
	private fk_case_id: string;

	constructor() {
		this.client_id = "";
		this.first_name = "";
		this.middle_name = "";
		this.last_name = "";
		this.date_of_birth = 0;
		this.sex = "Other";
		this.country_of_citizenship = "";
		this.primary_language = "";
		this.fk_case_id = "";
	}

	/* Getters */
	public getClientId(): string {
		return this.client_id;
	}
	public getFirstName(): string {
		return this.first_name;
	}
	public getMiddleName(): string {
		return this.middle_name;
	}
	public getLastName(): string {
		return this.last_name;
	}
	public getDateOfBirth(): number {
		return this.date_of_birth;
	}
	public getSex(): sex_option {
		return this.sex;
	}
	public getCountryOfCitizenship(): string {
		return this.country_of_citizenship;
	}
	public getPrimaryLanguage(): string {
		return this.primary_language;
	}
	public getFkCaseId(): string {
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
	public setSex(sex: sex_option): void {
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
