export class MockSqlTables {
	static USERS = "users";
	static CASE_FOLDERS = "case_folders";
	static CASE_FILES = "case_files";
	static FOLDER_LABELS = "folder_labels";
	static CLIENTS = "clients";

	constructor() {}

	static getArray(key: string) {
		const localStorageArray = JSON.parse(localStorage.getItem(key) as string);
		return localStorageArray;
	}

	static initArray(key: string) {
		localStorage.setItem(key, JSON.stringify([]));
	}

	static createUsers() {
		const usersTable = this.getArray(this.USERS);
		if (usersTable) return;
		this.initArray(this.USERS);
	}

	static createCaseFolders() {
		const caseFoldersTable = this.getArray(this.CASE_FOLDERS);
		if (caseFoldersTable) return;
		this.initArray(this.CASE_FOLDERS);
	}

	static createCaseFiles() {
		const caseFilesTable = this.getArray(this.CASE_FILES);
		if (caseFilesTable) return;
		this.initArray(this.CASE_FILES);
	}

	static createFolderLabels() {
		const folderLabelsTable = this.getArray(this.FOLDER_LABELS);
		if (folderLabelsTable) return;
		this.initArray(this.FOLDER_LABELS);
	}

	static createClients() {
		const clientsTable = this.getArray(this.CLIENTS);
		if (clientsTable) return;
		this.initArray(this.CLIENTS);
	}

	static createMockTables() {
		this.createUsers();
		this.createCaseFolders();
		this.createCaseFiles();
		this.createFolderLabels();
		this.createClients();
	}
}
