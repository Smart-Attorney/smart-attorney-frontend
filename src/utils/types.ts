interface SortOptions {
	clicked: boolean;
	name: string;
}

interface CaseFile {
	id: string;
	name: string;
	status: string;
	ref: {};
}

interface CaseFolder {
	id: string;
	name: string;
	status: string;
	deadline: string;
	labels: string[];
	files: CaseFile[];
}

export type { SortOptions, CaseFile, CaseFolder };
