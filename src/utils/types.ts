export interface ButtonProps {
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

export interface CaseFolderObj {
	id: string;
	name: string;
	createdDate: number;
	lastOpenedDate: number;
	status: string;
	deadline: number;
	labels: CaseFolderLabelObj[];
	files: CaseFileObj[];
	client: ClientObj | {};
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
	url: string;
}

export interface ClientObj {
	id: string;
	firstName: string;
	lastName: string;
	dateOfBirth: number;
	sex: "Male" | "Female" | "Other";
	countryOfCitizenship: string;
	primaryLanguage: string;
}

export type SexOptions = "Male" | "Female" | "Other";
