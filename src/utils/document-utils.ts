import { Document } from "../types/api";
import { DOCUMENT_STATUS } from "./constants/document-status";
import { SORT_OPTION } from "./constants/sort-options";

export class DocumentUtils {
	/**
	 * Sorts alphabetically from A to Z.
	 */
	private static sortByName(array: Document[]): Document[] {
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
	private static sortByDateCreated(array: Document[]): Document[] {
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
	private static sortByLastOpened(array: Document[]): Document[] {
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
	private static sortByStatus(array: Document[]): Document[] {
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

	public static sortByOption = (array: Document[], option: string): Document[] => {
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
