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
			const la = a.status;
			const lb = b.status;
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

	public static sortByOption = (array: DashboardFolderCardObj[], option: string): DashboardFolderCardObj[] => {
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

			default:
				return array;
		}
	};
}
