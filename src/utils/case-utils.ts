import { SORT_OPTION } from "./constants/sort-options";
import { Case } from "../types/api";

export class CaseUtils {
	private static CASE_FOLDER_COUNT_KEY = "case-folder-count";

	/**
	 * Stores the current number of case folders.
	 */
	public static setCaseCount(count: number): void {
		localStorage.setItem(this.CASE_FOLDER_COUNT_KEY, JSON.stringify(count));
	}

	/**
	 * Retrieves the current number of case folders.
	 */
	public static getCaseCount(): number {
		const countAsString = JSON.parse(localStorage.getItem(this.CASE_FOLDER_COUNT_KEY) as string);
		return parseInt(countAsString);
	}

	/************************************************************/

	/**
	 * Sorts alphabetically from A to Z.
	 */
	private static sortByName(array: Case[]): Case[] {
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
	private static sortByDateCreated(array: Case[]): Case[] {
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
	private static sortByLastOpened(array: Case[]): Case[] {
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
	private static sortByOpenCases(array: Case[]): Case[] {
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
	private static sortByDeadline(array: Case[]): Case[] {
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

	private static sortByCaseLabel(array: Case[], caseLabel: string): Case[] {
		const withMatchLabel: Case[] = [];
		const noMatchLabel: Case[] = [];
		const noLabels: Case[] = [];
		const caseSet = new Set<Case>();
		for (let i = 0, n = array.length; i < n; i++) {
			// syntax is ugly but its the only way it works
			if (array[i].labels.length === 0) {
				if (!caseSet.has(array[i])) {
					noLabels.push(array[i]);
					caseSet.add(array[i]);
				}
			}
			for (let j = 0, o = array[i].labels.length; j < o; j++) {
				// syntax is ugly but its the only way it works
				if (array[i].labels[j].name.toLowerCase() === caseLabel.toLowerCase()) {
					if (!caseSet.has(array[i])) {
						withMatchLabel.push(array[i]);
						caseSet.add(array[i]);
					}
				}
			}
			if (!caseSet.has(array[i])) {
				noMatchLabel.push(array[i]);
				caseSet.add(array[i]);
			}
		}
		return [...withMatchLabel, ...noMatchLabel, ...noLabels];
	}

	public static sortByOption = (
		array: Case[],
		option: string,
		label?: string
	): Case[] => {
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
	public static getCaseOrder(caseFolders: Case[]): Map<string, number> | null {
		if (!caseFolders) return null;
		let caseOrder = new Map<string, number>();
		for (let i = 0, n = caseFolders.length; i < n; i++) {
			caseOrder.set(caseFolders[i].id, i);
		}
		return caseOrder;
	}
}
