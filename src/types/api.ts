export type UserObj = {
	id: string;
	firstName: string;
	lastName: string;
	firmName: string;
	companyEmail: string;
	email: string;
	password: string;
};

export type DashboardCaseCardObj = {
	id: string;
	name: string;
	createdDate: number;
	lastOpenedDate: number;
	isOpen: boolean;
	urgentDocumentDeadline: number;
	labels: CaseLabelObj[];
	documents: DocumentObj[];
};

export type CaseLabelObj = {
	id: string;
	name: string | CaseLabelPreset;
};

export type ClientObj = {
	id: string;
	firstName: string;
	middleName: string;
	lastName: string;
	dateOfBirth: number;
	sex: Sex;
	countryOfCitizenship: string;
	primaryLanguage: string;
};

export type DocumentObj = {
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
