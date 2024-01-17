interface SortOptionsObj {
	clicked: boolean;
	name: string;
}

interface CaseFolderLabelObj {
	id: string;
	name: string;
}

interface UploadedFileObj {
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

interface CaseFolderObj {
	id: string;
	name: string;
	createdDate: number;
	lastOpenedDate: number;
	status: string;
	deadline: string;
	labels: CaseFolderLabelObj[];
	files: CaseFileObj[];
}

export type { SortOptionsObj, UploadedFileObj, CaseFolderLabelObj, CaseFileObj, CaseFolderObj };
