import { DOCUMENT_STATUS } from "../../../utils/constants/document-status";
import { CaseFileObj, DocumentStatus } from "../../../utils/types";
import { CaseFiles } from "../../mock-database/table-schemas";
import { SqlTables } from "../../mock-database/sql-tables";
import { DAO } from "../dao";

export class CaseFileDAO extends DAO {
	private static CASE_FILE_STORAGE_KEY = SqlTables.TABLE.DOCUMENT;

	static async getAllByCaseId(caseId: string): Promise<CaseFileObj[]> {
		const caseDocuments: CaseFileObj[] = [];
		const documents: CaseFiles[] = await super.getArray(this.CASE_FILE_STORAGE_KEY);
		for (let i = 0, n = documents.length; i < n; i++) {
			if (documents[i].case_folder_id_fk === caseId) {
				caseDocuments.push({
					id: documents[i].file_id,
					name: documents[i].file_name,
					createdDate: documents[i].created_date,
					lastOpenedDate: documents[i].last_opened_date,
					status: documents[i].status,
					deadline: documents[i].deadline,
					url: documents[i].url,
				});
			}
		}
		return caseDocuments;
	}

	static async getById(folderId: string, fileId: string): Promise<CaseFileObj | null> {
		const documents: CaseFiles[] = await super.getArray(this.CASE_FILE_STORAGE_KEY);
		for (let i = 0, n = documents.length; i < n; i++) {
			if (documents[i].case_folder_id_fk === folderId && documents[i].file_id === fileId) {
				const caseFile: CaseFileObj = {
					id: documents[i].file_id,
					name: documents[i].file_name,
					createdDate: documents[i].created_date,
					lastOpenedDate: documents[i].last_opened_date,
					status: documents[i].status,
					deadline: documents[i].deadline,
					url: documents[i].url,
				};
				return caseFile;
			}
		}
		return null;
	}

	static async add(fileId: string, fileName: string, fileUrl: string, caseId: string): Promise<CaseFiles | null> {
		const documents: CaseFiles[] = await super.getArray(this.CASE_FILE_STORAGE_KEY);
		const newDocument: CaseFiles = {
			file_id: fileId,
			file_name: fileName,
			created_date: Date.now(),
			last_opened_date: Date.now(),
			status: DOCUMENT_STATUS.IN_PROGRESS,
			deadline: 0,
			url: fileUrl,
			case_folder_id_fk: caseId,
		};
		const updatedArray = [...documents, newDocument];
		const success = await super.setArray(this.CASE_FILE_STORAGE_KEY, updatedArray);
		if (success) {
			return newDocument;
		}
		return null;
	}

	static async updateStatus(folderId: string, fileId: string, newStatus: DocumentStatus): Promise<boolean> {
		const documents: CaseFiles[] = await super.getArray(this.CASE_FILE_STORAGE_KEY);
		for (let i = 0, n = documents.length; i < n; i++) {
			if (documents[i].case_folder_id_fk === folderId && documents[i].file_id === fileId) {
				documents[i].status = newStatus;
			}
		}
		const success = await super.setArray(this.CASE_FILE_STORAGE_KEY, documents);
		if (success) {
			return true;
		}
		return false;
	}

	static async updateName(folderId: string, fileId: string, newName: string): Promise<boolean> {
		const documents: CaseFiles[] = await super.getArray(this.CASE_FILE_STORAGE_KEY);
		for (let i = 0, n = documents.length; i < n; i++) {
			if (documents[i].case_folder_id_fk === folderId && documents[i].file_id === fileId) {
				documents[i].file_name = newName;
			}
		}
		const success = await super.setArray(this.CASE_FILE_STORAGE_KEY, documents);
		if (success) {
			return true;
		}
		return false;
	}

	static async updateDeadline(folderId: string, fileId: string, newDeadline: number): Promise<boolean> {
		const documents: CaseFiles[] = await super.getArray(this.CASE_FILE_STORAGE_KEY);
		for (let i = 0, n = documents.length; i < n; i++) {
			if (documents[i].case_folder_id_fk === folderId && documents[i].file_id === fileId) {
				documents[i].deadline = newDeadline;
			}
		}
		const success = await super.setArray(this.CASE_FILE_STORAGE_KEY, documents);
		if (success) {
			return true;
		}
		return false;
	}

	static async deleteAllByCaseId(caseId: string): Promise<boolean> {
		const updatedArray: CaseFiles[] = [];
		const documents: CaseFiles[] = await super.getArray(this.CASE_FILE_STORAGE_KEY);
		for (let i = 0, n = documents.length; i < n; i++) {
			if (documents[i].case_folder_id_fk === caseId) {
				continue;
			}
			updatedArray.push(documents[i]);
		}
		const success = await super.setArray(this.CASE_FILE_STORAGE_KEY, updatedArray);
		if (success) {
			return true;
		}
		return false;
	}

	static async deleteById(caseId: string, fileId: string): Promise<boolean> {
		const updatedArray: CaseFiles[] = [];
		const documents: CaseFiles[] = await super.getArray(this.CASE_FILE_STORAGE_KEY);
		for (let i = 0, n = documents.length; i < n; i++) {
			if (documents[i].case_folder_id_fk === caseId && documents[i].file_id === fileId) {
				continue;
			}
			updatedArray.push(documents[i]);
		}
		const success = await super.setArray(this.CASE_FILE_STORAGE_KEY, updatedArray);
		if (success) {
			return true;
		}
		return false;
	}
}
