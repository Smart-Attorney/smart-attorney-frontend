import { DocumentStatus, Sex } from "../types/api";

export type UserDTO = {
	id: string;
	firstName: string;
	lastName: string;
	firmName: string;
	companyEmail: string;
	email: string;
	password: string;
};

export type CaseDTO = {
	id: string;
	name: string;
	createdDate: number;
	lastOpenedDate: number;
	isOpen: boolean;
	urgentDocumentDeadline: number;
	labels: CaseLabelDTO[];
	documents: DocumentDTO[];
};

export type CaseLabelDTO = {
	id: string;
	name: string;
};

export type ClientDTO = {
	id: string;
	firstName: string;
	middleName: string;
	lastName: string;
	dateOfBirth: number;
	sex: Sex;
	countryOfCitizenship: string;
	primaryLanguage: string;
};

export type DocumentDTO = {
	id: string;
	name: string;
	createdDate: number;
	lastOpenedDate: number;
	status: DocumentStatus;
	deadline: number;
	url: string;
};
