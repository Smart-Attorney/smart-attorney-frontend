import { DOCUMENT_STATUS } from "./constants/document-status";
import { SORT_OPTION } from "./constants/sort-options";
import { CaseFileObj } from "./types";

export class DocumentUtils {
	public static getUrgentDeadline = (documents: CaseFileObj[]): number => {
		if (!documents) return 0;
		const placeholderDate = 3250368000000; // (milliseconds) Wed Jan 01 3000 00:00:00 GMT+0000
		const currentDate = Date.now();
		let mostUrgentDeadline = placeholderDate;
		for (let i = 0, n = documents.length; i < n; i++) {
			if (documents[i].deadline === 0) continue;
			if (documents[i].deadline < currentDate) continue;
			if (documents[i].deadline < mostUrgentDeadline) {
				mostUrgentDeadline = documents[i].deadline;
			}
		}
		if (mostUrgentDeadline === placeholderDate) {
			return 0;
		}
		return mostUrgentDeadline;
	};

	/************************************************************/

	/**
	 * Sorts alphabetically from A to Z.
	 */
	private static sortByName(array: CaseFileObj[]): CaseFileObj[] {
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
	private static sortByDateCreated(array: CaseFileObj[]): CaseFileObj[] {
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
	private static sortByLastOpened(array: CaseFileObj[]): CaseFileObj[] {
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
	 * Sorts by status.
	 */
	private static sortByStatus(array: CaseFileObj[]): CaseFileObj[] {
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

	public static sortByOption = (array: CaseFileObj[], option: string): CaseFileObj[] => {
		switch (option) {
			case SORT_OPTION.NAME:
				return DocumentUtils.sortByName(array);

			case SORT_OPTION.DATE_CREATED:
				return DocumentUtils.sortByDateCreated(array);

			case SORT_OPTION.LAST_OPENED:
				return DocumentUtils.sortByLastOpened(array);

			case SORT_OPTION.STATUS:
				return DocumentUtils.sortByStatus(array);

			default:
				return array;
		}
	};
}
