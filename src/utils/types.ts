interface SortOptionsObj {
	clicked: boolean;
	name: string;
}

interface UploadedFileObj {
	id: string;
	data: File;
	selected: boolean;
}

interface CaseFolderLabelObj {
	id: string;
	name: string;
}

interface CaseFileObj {
	id: string;
	name: string;
	status: string;
	url: string;
}

interface CaseFolderObj {
	id: string;
	name: string;
	status: string;
	deadline: string;
	labels: CaseFolderLabelObj[];
	files: CaseFileObj[];
}

export type { SortOptionsObj, UploadedFileObj, CaseFolderLabelObj, CaseFileObj, CaseFolderObj };
