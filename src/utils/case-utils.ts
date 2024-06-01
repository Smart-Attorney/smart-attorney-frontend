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
}
