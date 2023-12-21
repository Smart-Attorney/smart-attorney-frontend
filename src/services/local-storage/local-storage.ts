interface CaseFolder {
	id: string;
	name: string;
	status: string;
	deadline: string;
	labels: string[];
	files: [];
}

class LocalStorage {
	//
	static getStoredCaseArray(): CaseFolder[] {
		const storedCaseArray = JSON.parse(localStorage.getItem("cases") as string);
		return storedCaseArray;
	}

	static setNewEmptyCaseArray(): void {
		const storedCaseArray = this.getStoredCaseArray();

		if (storedCaseArray === null) {
			const emptyCaseArray: {}[] = [];
			localStorage.setItem("cases", JSON.stringify(emptyCaseArray));
		}
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
