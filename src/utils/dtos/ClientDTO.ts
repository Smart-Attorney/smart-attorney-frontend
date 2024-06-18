import { SexOption } from "../types";

export class ClientDTO {
	private id: string;
	private firstName: string;
	private middleName: string;
	private lastName: string;
	private dateOfBirth: number;
	private sex: SexOption;
	private countryOfCitizenship: string;
	private primaryLanguage: string;

	constructor() {
		this.id = "";
		this.firstName = "";
		this.middleName = "";
		this.lastName = "";
		this.dateOfBirth = 0;
		this.sex = "Other";
		this.countryOfCitizenship = "";
		this.primaryLanguage = "";
	}

	/* Getter */
	public getId(): string {
		return this.id;
	}
	public getFirstName(): string {
		return this.firstName;
	}
	public getMiddleName(): string {
		return this.middleName;
	}
	public getLastName(): string {
		return this.lastName;
	}
	public getDateOfBirth(): number {
		return this.dateOfBirth;
	}
	public getSex(): SexOption {
		return this.sex;
	}
	public getCountryOfCitizenship(): string {
		return this.countryOfCitizenship;
	}
	public getPrimaryLanguage(): string {
		return this.primaryLanguage;
	}

	/* Setter */
	public setId(id: string): void {
		this.id = id;
	}
	public setFirstName(firstName: string): void {
		this.firstName = firstName;
	}
	public setMiddleName(middleName: string): void {
		this.middleName = middleName;
	}
	public setLastName(lastName: string): void {
		this.lastName = lastName;
	}
	public setDateOfBirth(dateOfBirth: number): void {
		this.dateOfBirth = dateOfBirth;
	}
	public setSex(sex: SexOption): void {
		this.sex = sex;
	}
	public setCountryOfCitizenship(countryOfCitizenship: string): void {
		this.countryOfCitizenship = countryOfCitizenship;
	}
	public setPrimaryLanguage(primaryLanguage: string): void {
		this.primaryLanguage = primaryLanguage;
	}
}
