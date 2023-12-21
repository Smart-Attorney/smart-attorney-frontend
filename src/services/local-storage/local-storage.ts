import { CaseFolder } from "../../utils/types";

class LocalStorage {
	//
	static #STORED_CASES_KEY: string = "cases";
	static #NEW_EMPTY_CASE_ARRAY: {}[] = [];

	static setNewEmptyCaseArray(): void {
		localStorage.setItem(
			LocalStorage.#STORED_CASES_KEY,
			JSON.stringify(LocalStorage.#NEW_EMPTY_CASE_ARRAY)
		);
	}

	static getStoredCaseArray(): CaseFolder[] {
		const storedCaseArray: CaseFolder[] = JSON.parse(
			localStorage.getItem(LocalStorage.#STORED_CASES_KEY) as string
		);
		return storedCaseArray;
	}

	static doesCaseArrayExist(): boolean {
		const storedCaseArray = this.getStoredCaseArray();
		if (storedCaseArray === null) {
			return false;
		}
		return true;
	}

	static findFolderByID(folderID: string): boolean {
		const storedCaseArray = this.getStoredCaseArray();

		for (let i = 0; i < storedCaseArray.length; i++) {
			if (storedCaseArray[i].id === folderID) {
				return true;
			}
		}
		return false;
	}
	//
}

export default LocalStorage;
