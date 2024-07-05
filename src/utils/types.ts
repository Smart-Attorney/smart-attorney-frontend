export interface UserObj {
	id: string;
	firstName: string;
	lastName: string;
	firmName: string;
	companyEmail: string;
	email: string;
	password: string;
}

export interface DashboardCaseCardObj {
	id: string;
	name: string;
	createdDate: number;
	lastOpenedDate: number;
	isOpen: boolean;
	urgentDocumentDeadline: number;
	labels: CaseLabelObj[];
	documents: DocumentObj[];
}

export interface CaseObj {
	id: string;
	name: string;
	createdDate: number;
	lastOpenedDate: number;
	isOpen: boolean;
}

export interface CaseLabelObj {
	id: string;
	name: string | CaseLabelPreset;
}

export interface ClientObj {
	id: string;
	firstName: string;
	middleName: string;
	lastName: string;
	dateOfBirth: number;
	sex: Sex;
	countryOfCitizenship: string;
	primaryLanguage: string;
}

export interface DocumentObj {
	id: string;
	name: string;
	createdDate: number;
	lastOpenedDate: number;
	status: DocumentStatus;
	deadline: number;
	url: string;
}

export type Sex = "Male" | "Female" | "Other";

export type DocumentStatus = "In Progress" | "In Review" | "Submitted";

export type CaseLabelPreset = "Asylum" | "Employment" | "Family" | "Humanitarian";

export interface LabelsDropdownMenuOptionObj {
	id: string;
	name: string;
	isClicked: boolean;
}

export interface FileForUploadObj {
	id: string;
	data: File;
}

export interface ButtonProps {
	img: string;
	title: string;
	name: string;
	type: "button" | "submit" | "reset";
	className: string;
	style: React.CSSProperties;
	isDisabled: boolean;
	onClick: () => void;
}
