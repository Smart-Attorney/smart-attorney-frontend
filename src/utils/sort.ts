import { DOC_STATUS } from "./constants/document-status";
import { CaseFileObj, DashboardFolderCardObj } from "./types";

export type UnsortedArray = DashboardFolderCardObj[] | CaseFileObj[];
export type SortedArray = DashboardFolderCardObj[] | CaseFileObj[];

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

	/* Sorts from closest to furthest deadline. */
	/* Places folders without a deadline at the end. */
	public static deadline(array: DashboardFolderCardObj[]): DashboardFolderCardObj[] {
		const foldersWithoutDeadlines = array.filter((folder) => {
			const deadline = new Date(folder.deadline).getTime();
			return deadline === 0;
		});
		const foldersWithDeadlines = array.filter((folder) => {
			const deadline = new Date(folder.deadline).getTime();
			return deadline !== 0;
		});
		const sortedArray = foldersWithDeadlines.sort((a, b) => {
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
		return [...sortedArray, ...foldersWithoutDeadlines];
	}

	/* Sorts by status. */
	public static status(array: CaseFileObj[]): CaseFileObj[] {
		const sortedArray = array.sort((a, b) => {
			let la: number;
			switch (a.status) {
				case DOC_STATUS.inProgress:
					la = 1;
					break;
				case DOC_STATUS.inReview:
					la = 2;
					break;
				case DOC_STATUS.submitted:
					la = 3;
					break;
				default:
					la = 0;
					break;
			}
			let lb: number;
			switch (b.status) {
				case DOC_STATUS.inProgress:
					lb = 1;
					break;
				case DOC_STATUS.inReview:
					lb = 2;
					break;
				case DOC_STATUS.submitted:
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
		case "Name":
			return SortArrayBy.name(array);

		case "Date Created":
			return SortArrayBy.dateCreated(array);

		case "Last Opened":
			return SortArrayBy.lastOpended(array);

		case "Open Cases":
			return SortArrayBy.openCases(array as DashboardFolderCardObj[]);

		case "Deadline":
			return SortArrayBy.deadline(array as DashboardFolderCardObj[]);

		case "Status":
			return SortArrayBy.status(array as CaseFileObj[]);

		default:
			return array;
	}
};
