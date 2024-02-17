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

export interface SexOptions {
	sex: "Male" | "Female" | "Other";
}

export interface ClientObj {
	firstName: string;
	lastName: string;
	dateOfBirth: string;
	sex: SexOptions | null;
	countryOfCitizenship: string;
	primaryLanguage: string;
}

export interface CaseFolderObj {
	id: string;
	name: string;
	createdDate: number;
	lastOpenedDate: number;
	status: string;
	deadline: string;
	labels: CaseFolderLabelObj[];
	files: CaseFileObj[];
	clients: ClientObj;
}
