import { DOCUMENT_STATUS } from "./constants/document-status";
import { SORT_OPTION } from "./constants/sort-options";
import { CaseFileObj, DashboardFolderCardObj } from "./types";

export type UnsortedArray = DashboardFolderCardObj[] | CaseFileObj[];
export type SortedArray = DashboardFolderCardObj[] | CaseFileObj[];

class SortArrayBy {
	/**
	 * Sorts alphabetically from A to Z.
	 */
	public static name(array: UnsortedArray): SortedArray {
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
	public static dateCreated(array: UnsortedArray): SortedArray {
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
	public static lastOpended(array: UnsortedArray): SortedArray {
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
	public static openCases(array: DashboardFolderCardObj[]): DashboardFolderCardObj[] {
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
	public static deadline(array: DashboardFolderCardObj[]): DashboardFolderCardObj[] {
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

	/**
	 * Sorts by status.
	 */
	public static status(array: CaseFileObj[]): CaseFileObj[] {
		const sortedArray = array.sort((a, b) => {
			let la: number;
			switch (a.status) {
				case DOCUMENT_STATUS.IN_PROGRESS:
					la = 1;
					break;
				case DOCUMENT_STATUS.IN_REVIEW:
					la = 2;
					break;
				case DOCUMENT_STATUS.SUBMITTED:
					la = 3;
					break;
				default:
					la = 0;
					break;
			}
			let lb: number;
			switch (b.status) {
				case DOCUMENT_STATUS.IN_PROGRESS:
					lb = 1;
					break;
				case DOCUMENT_STATUS.IN_REVIEW:
					lb = 2;
					break;
				case DOCUMENT_STATUS.SUBMITTED:
					lb = 3;
					break;
				default:
					lb = 0;
					break;
			}
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
}

export const sortArrayByOption = (array: UnsortedArray, option: string): SortedArray => {
	switch (option) {
		case SORT_OPTION.NAME:
			return SortArrayBy.name(array);

		case SORT_OPTION.DATE_CREATED:
			return SortArrayBy.dateCreated(array);

		case SORT_OPTION.LAST_OPENED:
			return SortArrayBy.lastOpended(array);

		case SORT_OPTION.OPEN_CASES:
			return SortArrayBy.openCases(array as DashboardFolderCardObj[]);

		case SORT_OPTION.DEADLINE:
			return SortArrayBy.deadline(array as DashboardFolderCardObj[]);

		case SORT_OPTION.STATUS:
			return SortArrayBy.status(array as CaseFileObj[]);

		default:
			return array;
	}
};
