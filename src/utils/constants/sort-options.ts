export const SORT_OPTION = Object.freeze({
	NAME: "Name",
	DATE_CREATED: "Date Created",
	LAST_OPENED: "Last Opened",
	OPEN_CASES: "Open Cases",
	DEADLINE: "Deadline",
	LABELS: "Labels",
	STATUS: "Status",
});

export interface SortOptionsObj {
	clicked: boolean;
	name: string;
}

export const DASHBOARD: SortOptionsObj[] = [
	{ clicked: false, name: SORT_OPTION.NAME },
	{ clicked: false, name: SORT_OPTION.DATE_CREATED },
	{ clicked: false, name: SORT_OPTION.LAST_OPENED },
	{ clicked: false, name: SORT_OPTION.OPEN_CASES },
	{ clicked: false, name: SORT_OPTION.DEADLINE },
	{ clicked: false, name: SORT_OPTION.LABELS },
];

export const CASE_FOLDER: SortOptionsObj[] = [
	{ clicked: false, name: SORT_OPTION.NAME },
	{ clicked: false, name: SORT_OPTION.DATE_CREATED },
	{ clicked: false, name: SORT_OPTION.LAST_OPENED },
	{ clicked: false, name: SORT_OPTION.STATUS },
];

export const NEW_CASE: SortOptionsObj[] = [
	{ clicked: false, name: SORT_OPTION.NAME },
	{ clicked: false, name: SORT_OPTION.DATE_CREATED },
	{ clicked: false, name: SORT_OPTION.LAST_OPENED },
	{ clicked: false, name: SORT_OPTION.STATUS },
];
