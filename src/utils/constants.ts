import type { SortOptionsObj } from "./types";

const DASHBOARD_SORT_OPTIONS: SortOptionsObj[] = [
	{ clicked: false, name: "Name" },
	{ clicked: false, name: "Date Created" },
	{ clicked: false, name: "Last Opened" },
	{ clicked: false, name: "Open Cases" },
	{ clicked: false, name: "Deadline" },
	{ clicked: false, name: "Labels" },
];

const CASE_FOLDER_SORT_OPTIONS: SortOptionsObj[] = [
	{ clicked: false, name: "Name" },
	{ clicked: false, name: "Date Created" },
	{ clicked: false, name: "Last Opened" },
	{ clicked: false, name: "Status" },
];

const NEW_CASE_SORT_OPTIONS: SortOptionsObj[] = [
	{ clicked: false, name: "Name" },
	{ clicked: false, name: "Date Created" },
	{ clicked: false, name: "Last Opened" },
	{ clicked: false, name: "Status" },
];

export { CASE_FOLDER_SORT_OPTIONS, DASHBOARD_SORT_OPTIONS, NEW_CASE_SORT_OPTIONS };
