import { CaseFileObj, CaseFolderObj } from "./types";

type UnsortedArray = CaseFolderObj[] | CaseFileObj[];
type SortedArray = CaseFolderObj[] | CaseFileObj[];

class SortArrayBy {
	/**
	 *
	 */
	/* Sorts alphabetically from A to Z. */
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

	/* Sorts from youngest to oldest. */
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

	/* Sorts from most recent to least recent date. */
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

	/* Sorts from open cases to closed cases. */
	/* Doesn't do anything yet lol */
	// public static openCases(array: CaseFolderObj[]): CaseFolderObj[] {
	// 	return [];
	// }

	/* Sorts from closest to furthest deadline. */
	public static deadline(array: CaseFolderObj[]): CaseFolderObj[] {
		const sortedArray = array.sort((a, b) => {
			const la = new Date(a.deadline).getTime();
			const lb = new Date(b.deadline).getTime();

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

	/* Sorts by status. */
	/* Doesn't do anything yet lol */
	// public static status(array: CaseFileObj[]): CaseFileObj[] {
	// 	return [];
	// }
}

const sortArrayByOption = (array: UnsortedArray, option: string): SortedArray => {
	switch (option) {
		case "Name":
			return SortArrayBy.name(array);

		case "Date Created":
			return SortArrayBy.dateCreated(array);

		case "Last Opened":
			return SortArrayBy.lastOpended(array);

		case "Open Cases":
			return array;

		case "Deadline":
			return SortArrayBy.deadline(array as CaseFolderObj[]);

		case "Status":
			return array;

		default:
			return array;
	}
};

export { sortArrayByOption };
