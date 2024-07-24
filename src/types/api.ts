export type User = {
	id: string;
	firstName: string;
	lastName: string;
	firmName: string;
	companyEmail: string;
	email: string;
	password: string;
};

export type Case = {
	id: string;
	name: string;
	createdDate: number;
	lastOpenedDate: number;
	isOpen: boolean;
	urgentDocumentDeadline: number;
	labels: CaseLabel[];
	documents: Document[];
};

export type CaseLabel = {
	id: string;
	name: string | CaseLabelPreset;
};

export type Client = {
	id: string;
	firstName: string;
	middleName: string;
	lastName: string;
	dateOfBirth: number;
	sex: Sex;
	countryOfCitizenship: string;
	primaryLanguage: string;
};

export type Document = {
	id: string;
	name: string;
	createdDate: number;
	lastOpenedDate: number;
	status: DocumentStatus;
	deadline: number;
	url: string;
};

export type Sex = "Male" | "Female" | "Other";

export type DocumentStatus = "In Progress" | "In Review" | "Submitted";

export type CaseLabelPreset = "Asylum" | "Employment" | "Family" | "Humanitarian";
