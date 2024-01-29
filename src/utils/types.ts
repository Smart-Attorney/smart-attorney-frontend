interface ButtonProps {
	name: string;
	className?: string;
	onClick?: () => void;
	disabled?: boolean;
	style?: React.CSSProperties;
	img?: string;
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
	sex: SexOptions | null;
	primaryLanguage: string;
	countryOfCitizenship: string;
	dateOfBirth: string;
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

export type { ButtonProps, CaseFileObj, CaseFolderLabelObj, CaseFolderObj, ClientInfoObj, FileForUploadObj, SortOptionsObj };
