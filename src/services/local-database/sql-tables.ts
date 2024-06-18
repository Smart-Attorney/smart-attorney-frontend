export class SqlTables {
	public static TABLE = Object.freeze({
		USER: "user",
		CASES: "cases",
		DOCUMENT: "document",
		CASE_LABEL: "case_label",
		CLIENT: "client",
	});

	/************************************************************/

	private static set(key: string): void {
		localStorage.setItem(key, JSON.stringify([]));
	}

	private static get(key: string): string | null {
		const localStorageItem = localStorage.getItem(key);
		if (localStorageItem !== null) {
			return JSON.parse(localStorageItem);
		}
		return null;
	}

	private static exists(key: string): boolean {
		if (this.get(key) !== null) {
			return true;
		}
		return false;
	}

	/************************************************************/

	private static createUserTable() {
		const userTableExists = this.exists(this.TABLE.USER);
		if (userTableExists) return;
		this.set(this.TABLE.USER);
	}

	private static createCasesTable() {
		const casesTableExists = this.exists(this.TABLE.CASES);
		if (casesTableExists) return;
		this.set(this.TABLE.CASES);
	}

	private static createDocumentTable() {
		const documentTableExists = this.exists(this.TABLE.DOCUMENT);
		if (documentTableExists) return;
		this.set(this.TABLE.DOCUMENT);
	}

	private static createCaseLabelTable() {
		const caseLabelTableExists = this.exists(this.TABLE.CASE_LABEL);
		if (caseLabelTableExists) return;
		this.set(this.TABLE.CASE_LABEL);
	}

	private static createClientTable() {
		const clientTableExists = this.exists(this.TABLE.CLIENT);
		if (clientTableExists) return;
		this.set(this.TABLE.CLIENT);
	}

	/************************************************************/

	private static removeDeprecated() {
		for (let i = 0, n = localStorage.length; i < n; i++) {
			const key = localStorage.key(i);
			if (key === null) continue;
			if (key === this.TABLE.USER) continue;
			if (key === this.TABLE.CASES) continue;
			if (key === this.TABLE.DOCUMENT) continue;
			if (key === this.TABLE.CASE_LABEL) continue;
			if (key === this.TABLE.CLIENT) continue;
			localStorage.removeItem(key);
		}
	}

	public static create() {
		const user = this.exists(this.TABLE.USER);
		const cases = this.exists(this.TABLE.CASES);
		const document = this.exists(this.TABLE.DOCUMENT);
		const case_label = this.exists(this.TABLE.CASE_LABEL);
		const client = this.exists(this.TABLE.CLIENT);
		if (user && cases && document && case_label && client) return;
		this.removeDeprecated();
		this.createUserTable();
		this.createCasesTable();
		this.createDocumentTable();
		this.createCaseLabelTable();
		this.createClientTable();
	}
}
