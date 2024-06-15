export interface UserObj {
  id: string;
  firstName: string;
  lastName: string;
  firmName: string;
  companyEmail: string;
  email: string;
  password: string;
}

export interface DashboardFolderCardObj {
	id: string;
	name: string;
	createdDate: number;
	lastOpenedDate: number;
	isOpen: boolean;
	urgentDocumentDeadline: number;
	labels: CaseFolderLabelObj[];
	documents: CaseFileObj[];
}

export interface CaseFolderObj {
	id: string;
	name: string;
	createdDate: number;
	lastOpenedDate: number;
	isOpen: boolean;
}

export interface CaseFolderLabelObj {
	id: string;
	name: string | CaseLabel;
}

export interface ClientObj {
	id: string;
	firstName: string;
	middleName: string;
	lastName: string;
	dateOfBirth: number;
	sex: SexOption;
	countryOfCitizenship: string;
	primaryLanguage: string;
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

export type SexOption = "Male" | "Female" | "Other";

export type DocumentStatus = "In Progress" | "In Review" | "Submitted";

export type CaseLabel = "Asylum" | "Employment" | "Family" | "Humanitarian";

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
	title?: string;
	name: string;
	type: "button" | "submit" | "reset";
	img?: string;
	isDisabled?: boolean;
	style?: React.CSSProperties;
	className?: string;
	onClick?: () => void;
}
