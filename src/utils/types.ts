interface ButtonProps {
	name: string;
	type: "button" | "submit" | "reset";
	img?: string;
	disabled?: boolean;
	style?: React.CSSProperties;
	className?: string;
	onClick?: () => void;
}

interface SortOptionsObj {
	clicked: boolean;
	name: string;
}

interface CaseFolderLabelObj {
	id: string;
	name: string;
}

interface FileForUploadObj {
	id: string;
	data: File;
	selected: boolean;
}

interface CaseFileObj {
	id: string;
	name: string;
	createdDate: number;
	lastOpenedDate: number;
	status: string;
	url: string;
}

interface SexOptions {
	sex: "Male" | "Female" | "Other";
}

interface ClientInfoObj {
	firstName: string;
	lastName: string;
	dateOfBirth: string;
	sex: SexOptions | null;
	countryOfCitizenship: string;
	primaryLanguage: string;
}

interface CaseFolderObj {
	id: string;
	name: string;
	createdDate: number;
	lastOpenedDate: number;
	status: string;
	deadline: string;
	labels: CaseFolderLabelObj[];
	files: CaseFileObj[];
	clientInfo: ClientInfoObj;
}

export type {
	ButtonProps,
	CaseFileObj,
	CaseFolderLabelObj,
	CaseFolderObj,
	ClientInfoObj,
	FileForUploadObj,
	SexOptions,
	SortOptionsObj,
};
