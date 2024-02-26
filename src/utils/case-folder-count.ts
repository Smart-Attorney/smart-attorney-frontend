export class CaseFolderCount {
	private static CASE_FOLDER_COUNT_KEY = "case-folder-count";

	static set(count: number): void {
		sessionStorage.setItem(this.CASE_FOLDER_COUNT_KEY, JSON.stringify(count));
	}

	static get(): number {
		const countAsString = JSON.parse(sessionStorage.getItem(this.CASE_FOLDER_COUNT_KEY) as string);
		return parseInt(countAsString);
	}
}
