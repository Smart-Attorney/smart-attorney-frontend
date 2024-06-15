import { SORT_OPTION } from "./constants/sort-options";
import { DashboardFolderCardObj } from "./types";

export class CaseUtils {
	private static CASE_FOLDER_COUNT_KEY = "case-folder-count";

	/**
	 * Stores the current number of case folders.
	 */
	public static setCaseCount(count: number): void {
		sessionStorage.setItem(this.CASE_FOLDER_COUNT_KEY, JSON.stringify(count));
	}

	/**
	 * Retrieves the current number of case folders.
	 */
	public static getCaseCount(): number {
		const countAsString = JSON.parse(sessionStorage.getItem(this.CASE_FOLDER_COUNT_KEY) as string);
		return parseInt(countAsString);
	}

	/************************************************************/

	/**
	 * Sorts alphabetically from A to Z.
	 */
	private static sortByName(array: DashboardFolderCardObj[]): DashboardFolderCardObj[] {
		const sortedArray = array.sort((a, b) => {
			const la = a.name.toLowerCase();
			const lb = b.name.toLowerCase();
			if (la < lb) {
				return -1;
			}
			if (la > lb) {
				return 1;
			}
			return 0;
		});
		return sortedArray;
	}

	/**
	 * Sorts from youngest to oldest.
	 */
	private static sortByDateCreated(array: DashboardFolderCardObj[]): DashboardFolderCardObj[] {
		const sortedArray = array.sort((a, b) => {
			const la = a.createdDate;
			const lb = b.createdDate;
			if (la < lb) {
				return 1;
			}
			if (la > lb) {
				return -1;
			}
			return 0;
		});
		return sortedArray;
	}

	/**
	 * Sorts from most recent to least recent date.
	 */
	private static sortByLastOpened(array: DashboardFolderCardObj[]): DashboardFolderCardObj[] {
		const sortedArray = array.sort((a, b) => {
			const la = a.lastOpenedDate;
			const lb = b.lastOpenedDate;
			if (la < lb) {
				return 1;
			}
			if (la > lb) {
				return -1;
			}
			return 0;
		});
		return sortedArray;
	}

	/**
	 * Sorts from open cases to closed cases.
	 */
	private static sortByOpenCases(array: DashboardFolderCardObj[]): DashboardFolderCardObj[] {
		const sortedArray = array.sort((a, b) => {
			const la = a.isOpen;
			const lb = b.isOpen;
			if (la < lb) {
				return 1;
			}
			if (la > lb) {
				return -1;
			}
			return 0;
		});
		return sortedArray;
	}

	/**
	 * Sorts from closest to furthest deadline.
	 * Places folders without a deadline at the end.
	 */
	private static sortByDeadline(array: DashboardFolderCardObj[]): DashboardFolderCardObj[] {
		const foldersWithoutDeadlines = array.filter((folder) => {
			const deadline = new Date(folder.urgentDocumentDeadline).getTime();
			return deadline === 0;
		});
		const foldersWithDeadlines = array.filter((folder) => {
			const deadline = new Date(folder.urgentDocumentDeadline).getTime();
			return deadline !== 0;
		});
		const sortedArray = foldersWithDeadlines.sort((a, b) => {
			const la = new Date(a.urgentDocumentDeadline).getTime();
			const lb = new Date(b.urgentDocumentDeadline).getTime();
			if (la < lb) {
				return -1;
			}
			if (la > lb) {
				return 1;
			}
			return 0;
		});
		return [...sortedArray, ...foldersWithoutDeadlines];
	}

	private static sortByCaseLabel(array: DashboardFolderCardObj[], caseLabel: string): DashboardFolderCardObj[] {
		let casesWithLabel: DashboardFolderCardObj[] = [];
		let casesWithoutLabel: DashboardFolderCardObj[] = [];
		let casesWithNoLabels: DashboardFolderCardObj[] = [];
		for (let i = 0, n = array.length; i < n; i++) {
			if (array[i].labels.length === 0) {
				casesWithNoLabels.push(array[i]);
			}
			for (let j = 0, o = array[i].labels.length; j < o; j++) {
				if (array[i].labels[j].name.toLowerCase() === caseLabel.toLowerCase()) {
					casesWithLabel.push(array[i]);
				} else {
					casesWithoutLabel.push(array[i]);
				}
			}
		}
		return [...casesWithLabel, ...casesWithoutLabel, ...casesWithNoLabels];
	}

	public static sortByOption = (
		array: DashboardFolderCardObj[],
		option: string,
		label?: string
	): DashboardFolderCardObj[] => {
		switch (option) {
			case SORT_OPTION.NAME:
				return CaseUtils.sortByName(array);

			case SORT_OPTION.DATE_CREATED:
				return CaseUtils.sortByDateCreated(array);

			case SORT_OPTION.LAST_OPENED:
				return CaseUtils.sortByLastOpened(array);

			case SORT_OPTION.OPEN_CASES:
				return CaseUtils.sortByOpenCases(array);

			case SORT_OPTION.DEADLINE:
				return CaseUtils.sortByDeadline(array);

			case SORT_OPTION.LABELS:
				return CaseUtils.sortByCaseLabel(array, label!);

			default:
				return array;
		}
	};

	/************************************************************/

	// revisit later, might not need this method
	public static getCaseOrder(caseFolders: DashboardFolderCardObj[]): Map<string, number> | null {
		if (!caseFolders) return null;
		let caseOrder = new Map<string, number>();
		for (let i = 0, n = caseFolders.length; i < n; i++) {
			caseOrder.set(caseFolders[i].id, i);
		}
		return caseOrder;
	}
}
