export interface SortOptionsObj {
	clicked: boolean;
	name: string;
}

export const SortByLabel = Object.freeze({
	NAME: "Name",
	DATE_CREATED: "Date Created",
	LAST_OPENED: "Last Opened",
	OPEN_CASES: "Open Cases",
	DEADLINE: "Deadline",
	LABELS: "Labels",
	STATUS: "Status",
});

export const DASHBOARD: SortOptionsObj[] = [
	{ clicked: false, name: SortByLabel.NAME },
	{ clicked: false, name: SortByLabel.DATE_CREATED },
	{ clicked: false, name: SortByLabel.LAST_OPENED },
	{ clicked: false, name: SortByLabel.OPEN_CASES },
	{ clicked: false, name: SortByLabel.DEADLINE },
	{ clicked: false, name: SortByLabel.LABELS },
];

export const CASE_FOLDER: SortOptionsObj[] = [
	{ clicked: false, name: SortByLabel.NAME },
	{ clicked: false, name: SortByLabel.DATE_CREATED },
	{ clicked: false, name: SortByLabel.LAST_OPENED },
	{ clicked: false, name: SortByLabel.STATUS },
];

export const NEW_CASE: SortOptionsObj[] = [
	{ clicked: false, name: SortByLabel.NAME },
	{ clicked: false, name: SortByLabel.DATE_CREATED },
	{ clicked: false, name: SortByLabel.LAST_OPENED },
	{ clicked: false, name: SortByLabel.STATUS },
];
