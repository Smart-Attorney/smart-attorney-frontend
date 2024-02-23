export class MockSqlTables {
	static table = Object.freeze({
		USERS: "users",
		CASE_FOLDERS: "case_folders",
		CASE_FILES: "case_files",
		FOLDER_LABELS: "folder_labels",
		CLIENTS: "clients",
	});

	constructor() {}

	static getArray(key: string) {
		const localStorageArray = JSON.parse(localStorage.getItem(key) as string);
		return localStorageArray;
	}

	static initArray(key: string) {
		localStorage.setItem(key, JSON.stringify([]));
	}

	static createUsers() {
		const usersTable = this.getArray(this.table.USERS);
		if (usersTable) return;
		this.initArray(this.table.USERS);
	}

	static createCaseFolders() {
		const caseFoldersTable = this.getArray(this.table.CASE_FOLDERS);
		if (caseFoldersTable) return;
		this.initArray(this.table.CASE_FOLDERS);
	}

	static createCaseFiles() {
		const caseFilesTable = this.getArray(this.table.CASE_FILES);
		if (caseFilesTable) return;
		this.initArray(this.table.CASE_FILES);
	}

	static createFolderLabels() {
		const folderLabelsTable = this.getArray(this.table.FOLDER_LABELS);
		if (folderLabelsTable) return;
		this.initArray(this.table.FOLDER_LABELS);
	}

	static createClients() {
		const clientsTable = this.getArray(this.table.CLIENTS);
		if (clientsTable) return;
		this.initArray(this.table.CLIENTS);
	}

	static createMockTables() {
		this.createUsers();
		this.createCaseFolders();
		this.createCaseFiles();
		this.createFolderLabels();
		this.createClients();
	}

	// TODO
	// filter out previous/deprecated local storage keys
}
