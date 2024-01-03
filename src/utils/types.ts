interface SortOptions {
	clicked: boolean;
	name: string;
}

interface LabelObj {
	id: string;
	name: string;
}

interface FileObj {
	id: string;
	name: string;
	status: string;
	ref: {};
}

interface FolderObj {
	id: string;
	name: string;
	status: string;
	deadline: string;
	labels: LabelObj[];
	files: FileObj[];
}

export type { SortOptions, LabelObj, FileObj, FolderObj };
