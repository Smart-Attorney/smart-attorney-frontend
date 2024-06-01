import { CaseFileObj } from "./types";

export class CaseUtils {
	private static CASE_FOLDER_COUNT_KEY = "case-folder-count";

	/**
	 * Stores the current number of case folders.
	 */
	static setCaseCount(count: number): void {
		sessionStorage.setItem(this.CASE_FOLDER_COUNT_KEY, JSON.stringify(count));
	}

	/**
	 * Retrieves the current number of case folders.
	 */
	static getCaseCount(): number {
		const countAsString = JSON.parse(sessionStorage.getItem(this.CASE_FOLDER_COUNT_KEY) as string);
		return parseInt(countAsString);
	}

	static getUrgentDocumentDeadline = (documents: CaseFileObj[]): number => {
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
}
