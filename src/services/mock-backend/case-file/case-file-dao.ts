import { DOCUMENT_STATUS } from "../../../utils/constants/document-status";
import { CaseFileObj, DocumentStatus } from "../../../utils/types";
import { CaseFiles } from "../../mock-sql/schemas";
import { MockSqlTables } from "../../mock-sql/tables";
import { DAO } from "../dao";

export class CaseFileDAO extends DAO {
	private static CASE_FILE_STORAGE_KEY = MockSqlTables.table.CASE_FILES;

	static async getAllFilesByCaseFolderId(caseFolderId: string) {
		const caseFolderFiles: CaseFileObj[] = [];
		const caseFileArray: CaseFiles[] = await super.getArray(this.CASE_FILE_STORAGE_KEY);
		for (let i = 0, n = caseFileArray.length; i < n; i++) {
			if (caseFileArray[i].case_folder_id_fk === caseFolderId) {
				caseFolderFiles.push({
					id: caseFileArray[i].file_id,
					name: caseFileArray[i].file_name,
					createdDate: caseFileArray[i].created_date,
					lastOpenedDate: caseFileArray[i].last_opened_date,
					status: caseFileArray[i].status,
					deadline: caseFileArray[i].deadline,
					url: caseFileArray[i].url,
				});
			}
		}
		return caseFolderFiles;
	}

	static async getCaseFileById(folderId: string, fileId: string) {
		const caseFileArray: CaseFiles[] = await super.getArray(this.CASE_FILE_STORAGE_KEY);
		for (let i = 0, n = caseFileArray.length; i < n; i++) {
			if (caseFileArray[i].case_folder_id_fk === folderId && caseFileArray[i].file_id === fileId) {
				const caseFile: CaseFileObj = {
					id: caseFileArray[i].file_id,
					name: caseFileArray[i].file_name,
					createdDate: caseFileArray[i].created_date,
					lastOpenedDate: caseFileArray[i].last_opened_date,
					status: caseFileArray[i].status,
					deadline: caseFileArray[i].deadline,
					url: caseFileArray[i].url,
				};
				return caseFile;
			}
		}
		return null;
	}

	static async addNewCaseFile(fileId: string, fileName: string, fileUrl: string, caseFolderId: string) {
		const caseFileArray: CaseFiles[] = await super.getArray(this.CASE_FILE_STORAGE_KEY);
		const newCaseFile: CaseFiles = {
			file_id: fileId,
			file_name: fileName,
			created_date: Date.now(),
			last_opened_date: Date.now(),
			status: DOCUMENT_STATUS.IN_PROGRESS,
			deadline: 0,
			url: fileUrl,
			case_folder_id_fk: caseFolderId,
		};
		const updatedArray = [...caseFileArray, newCaseFile];
		const success = await super.setArray(this.CASE_FILE_STORAGE_KEY, updatedArray);
		if (success) {
			return newCaseFile;
		}
		return null;
	}

	static async updateFileStatus(folderId: string, fileId: string, newStatus: DocumentStatus) {
		const caseFileArray: CaseFiles[] = await super.getArray(this.CASE_FILE_STORAGE_KEY);
		for (let i = 0, n = caseFileArray.length; i < n; i++) {
			if (caseFileArray[i].case_folder_id_fk === folderId && caseFileArray[i].file_id === fileId) {
				caseFileArray[i].status = newStatus;
			}
		}
		const success = await super.setArray(this.CASE_FILE_STORAGE_KEY, caseFileArray);
		if (success) {
			return newStatus;
		}
		return null;
	}

	static async updateFileName(folderId: string, fileId: string, newName: string) {
		const caseFileArray: CaseFiles[] = await super.getArray(this.CASE_FILE_STORAGE_KEY);
		for (let i = 0, n = caseFileArray.length; i < n; i++) {
			if (caseFileArray[i].case_folder_id_fk === folderId && caseFileArray[i].file_id === fileId) {
				caseFileArray[i].file_name = newName;
			}
		}
		const success = await super.setArray(this.CASE_FILE_STORAGE_KEY, caseFileArray);
		if (success) {
			return newName;
		}
		return null;
	}

	static async updateFileDeadline(folderId: string, fileId: string, newDeadline: number) {
		const caseFileArray: CaseFiles[] = await super.getArray(this.CASE_FILE_STORAGE_KEY);
		for (let i = 0, n = caseFileArray.length; i < n; i++) {
			if (caseFileArray[i].case_folder_id_fk === folderId && caseFileArray[i].file_id === fileId) {
				caseFileArray[i].deadline = newDeadline;
			}
		}
		const success = await super.setArray(this.CASE_FILE_STORAGE_KEY, caseFileArray);
		if (success) {
			return newDeadline;
		}
		return null;
	}

	static async deleteAllFilesByFolderId(folderId: string) {
		const updatedArray: CaseFiles[] = [];
		const caseFileArray: CaseFiles[] = await super.getArray(this.CASE_FILE_STORAGE_KEY);
		for (let i = 0, n = caseFileArray.length; i < n; i++) {
			if (caseFileArray[i].case_folder_id_fk === folderId) {
				continue;
			}
			updatedArray.push(caseFileArray[i]);
		}
		const success = await super.setArray(this.CASE_FILE_STORAGE_KEY, updatedArray);
		if (success) {
			return true;
		}
		return false;
	}

	static async deleteFileById(folderId: string, fileId: string) {
		const updatedArray: CaseFiles[] = [];
		const caseFileArray: CaseFiles[] = await super.getArray(this.CASE_FILE_STORAGE_KEY);
		for (let i = 0, n = caseFileArray.length; i < n; i++) {
			if (caseFileArray[i].case_folder_id_fk === folderId && caseFileArray[i].file_id === fileId) {
				continue;
			}
			updatedArray.push(caseFileArray[i]);
		}
		const success = await super.setArray(this.CASE_FILE_STORAGE_KEY, updatedArray);
		if (success) {
			return true;
		}
		return false;
	}
}
