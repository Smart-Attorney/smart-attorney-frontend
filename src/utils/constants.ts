import type { SortOptions } from "./types";

/**
 * DEPRECATED
 * Remove at earliest convenience.
 */
const MOCK_CASE_FOLDERS = [
	{ id: 1, name: "Name of Case 1", deadline: "10/22/23", status: "#53EF0A" },
	{ id: 2, name: "Name of Case 2", deadline: "11/22/23", status: "#FB3E3E" },
	{ id: 3, name: "Name of Case 3", deadline: "12/24/23", status: "#53EF0A" },
	{ id: 4, name: "Name of Case 4", deadline: "1/12/24", status: "#FB3E3E" },
];

/**
 * DEPRECATED
 * Remove at earliest convenience.
 */
const MOCK_UPLOADED_FILES = [
	{ id: 1, name: "Hardship Letter.doc", status: "Submitted" },
	{ id: 2, name: "Evidence.pdf", status: "Submitted" },
	{ id: 3, name: "Written Statement", status: "Reviewed" },
];

const DASHBOARD_SORT_OPTIONS: SortOptions[] = [
	{ clicked: false, name: "Name" },
	{ clicked: false, name: "Date Created" },
	{ clicked: false, name: "Last Opened" },
	{ clicked: false, name: "Open Cases" },
	{ clicked: false, name: "Deadline" },
	{ clicked: false, name: "Labels" },
];

const NEW_CASE_SORT_OPTIONS: SortOptions[] = [
	{ clicked: false, name: "Name" },
	{ clicked: false, name: "Date Created" },
	{ clicked: false, name: "Last Opened" },
	{ clicked: false, name: "Status" },
];

export { MOCK_CASE_FOLDERS, MOCK_UPLOADED_FILES, DASHBOARD_SORT_OPTIONS, NEW_CASE_SORT_OPTIONS };
