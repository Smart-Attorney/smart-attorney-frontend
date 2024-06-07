export interface ButtonProps {
	title?: string;
	name: string;
	type: "button" | "submit" | "reset";
	img?: string;
	disabled?: boolean;
	style?: React.CSSProperties;
	className?: string;
	onClick?: () => void;
}

export interface FileForUploadObj {
	id: string;
	data: File;
}

export interface DashboardFolderCardObj {
	id: string;
	name: string;
	createdDate: number;
	lastOpenedDate: number;
	status: boolean;
	urgentDocumentDeadline: number;
	labels: CaseFolderLabelObj[];
	files: CaseFileObj[];
}

export interface CaseFolderObj {
	id: string;
	name: string;
	createdDate: number;
	lastOpenedDate: number;
	status: boolean;
}

export interface CaseFolderLabelObj {
	id: string;
	name: string | CaseLabel;
}

export interface LabelsDropdownMenuOptionObj {
	id: string;
	name: string;
	clicked: boolean;
}

export interface CaseFileObj {
	id: string;
	name: string;
	createdDate: number;
	lastOpenedDate: number;
	status: DocumentStatus;
	deadline: number;
	url: string;
}

export interface ClientObj {
	id: string;
	firstName: string;
	middleName: string;
	lastName: string;
	dateOfBirth: number;
	sex: SexOptions;
	countryOfCitizenship: string;
	primaryLanguage: string;
}

export type SexOptions = "Male" | "Female" | "Other";

export type DocumentStatus = "In Progress" | "In Review" | "Submitted";

export type CaseLabel = "Asylum" | "Employment" | "Family" | "Humanitarian";
