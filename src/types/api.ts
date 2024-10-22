export type ResponseBody<T> = {
	success: boolean;
	message: string;
	data: T;
	status: number;
};

export type User = {
	id: string; // short uuid
	firstName: string;
	lastName: string;
	firmName: string;
	companyEmail: string;
	email: string;
	password: string;
};

export type Case = {
	id: string; // short uuid
	name: string;
	createdDate: number; // unix time ms
	lastOpenedDate: number; // unix time ms
	isOpen: boolean;
	urgentDocumentDeadline: number; // unix time ms
	labels: CaseLabel[];
	documents: Document[];
};

export type CaseLabel = {
	id: string; // short uuid
	name: string | CaseLabelPreset;
};

export type Client = {
	id: string; // short uuid
	firstName: string;
	middleName: string;
	lastName: string;
	dateOfBirth: number; // unix time ms
	sex: Sex;
	countryOfCitizenship: string;
	primaryLanguage: string;
};

export type Document = {
	id: string; // short uuid
	name: string;
	createdDate: number; // unix time ms
	lastOpenedDate: number; // unix time ms
	status: DocumentStatus;
	deadline: number;
	url: string; // deprecated hoa pls remove
};

export type Sex = "Male" | "Female" | "Other";

export type DocumentStatus = "In Progress" | "In Review" | "Submitted";

export type CaseLabelPreset =
	| "Asylum"
	| "Employment"
	| "Family"
	| "Humanitarian";
