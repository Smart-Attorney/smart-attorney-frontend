export interface SortOptionsObj {
	clicked: boolean;
	name: string;
}

export const DASHBOARD: SortOptionsObj[] = [
	{ clicked: false, name: "Name" },
	{ clicked: false, name: "Date Created" },
	{ clicked: false, name: "Last Opened" },
	{ clicked: false, name: "Open Cases" },
	{ clicked: false, name: "Deadline" },
	{ clicked: false, name: "Labels" },
];

export const CASE_FOLDER: SortOptionsObj[] = [
	{ clicked: false, name: "Name" },
	{ clicked: false, name: "Date Created" },
	{ clicked: false, name: "Last Opened" },
	{ clicked: false, name: "Status" },
];

export const NEW_CASE: SortOptionsObj[] = [
	{ clicked: false, name: "Name" },
	{ clicked: false, name: "Date Created" },
	{ clicked: false, name: "Last Opened" },
	{ clicked: false, name: "Status" },
];
