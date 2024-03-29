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
	status: string;
	deadline: number;
	labels: CaseFolderLabelObj[];
	files: CaseFileObj[];
}

export interface CaseFolderObj {
	id: string;
	name: string;
	createdDate: number;
	lastOpenedDate: number;
	status: string;
	deadline: number;
}

export interface CaseFolderLabelObj {
	id: string;
	name: string;
}

export interface CaseFileObj {
	id: string;
	name: string;
	createdDate: number;
	lastOpenedDate: number;
  status: string;
  deadline: number;
	url: string;
}

export interface ClientObj {
	id: string;
	firstName: string;
	lastName: string;
	dateOfBirth: number;
	sex: SexOptions;
	countryOfCitizenship: string;
	primaryLanguage: string;
}

export type SexOptions = "Male" | "Female" | "Other";
