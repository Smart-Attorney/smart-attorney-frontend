export interface ButtonProps {
	name: string;
	type: "button" | "submit" | "reset";
	img?: string;
	disabled?: boolean;
	style?: React.CSSProperties;
	className?: string;
	onClick?: () => void;
}

export interface SortOptionsObj {
	clicked: boolean;
	name: string;
}

export interface CaseFolderLabelObj {
	id: string;
	name: string;
}

export interface FileForUploadObj {
	id: string;
	data: File;
	selected: boolean;
}

export interface CaseFileObj {
	id: string;
	name: string;
	createdDate: number;
	lastOpenedDate: number;
	status: string;
	url: string;
}

export enum SexOptions {
	Male = "Male",
	Female = "Female",
	Other = "Other",
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
