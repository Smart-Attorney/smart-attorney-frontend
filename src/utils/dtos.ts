import { DocumentStatus, Sex } from "./types";

export interface UserDTO {
	id: string;
	firstName: string;
	lastName: string;
	firmName: string;
	companyEmail: string;
	email: string;
	password: string;
}

export interface CaseDTO {
	id: string;
	name: string;
	createdDate: number;
	lastOpenedDate: number;
	isOpen: boolean;
	urgentDocumentDeadline: number;
	labels: CaseLabelDTO[];
	documents: DocumentDTO[];
}

export interface CaseLabelDTO {
	id: string;
	name: string;
}

export interface ClientDTO {
	id: string;
	firstName: string;
	middleName: string;
	lastName: string;
	dateOfBirth: number;
	sex: Sex;
	countryOfCitizenship: string;
	primaryLanguage: string;
}

export interface DocumentDTO {
	id: string;
	name: string;
	createdDate: number;
	lastOpenedDate: number;
	status: DocumentStatus;
	deadline: number;
	url: string;
}
