interface SortOptions {
	clicked: boolean;
	name: string;
}

interface FileItem {
	id: string;
	name: string;
	status: string;
	ref: {};
}

interface FolderItem {
	id: string;
	name: string;
	status: string;
	deadline: string;
	labels: string[];
	files: FileItem[];
}

export type { SortOptions, FileItem, FolderItem };
