import { DocumentStatus } from "../../../types/api";
import { DOCUMENT_STATUS } from "../../../utils/constants/document-status";
import { DatabaseConnection } from "../../local-database/database-connection";
import { DocumentEntity } from "../../local-database/entities";
import { SqlTables } from "../../local-database/sql-tables";

export class DocumentDAO {
	private DOCUMENT_KEY = SqlTables.TABLE.DOCUMENT;
	private dbConn: DatabaseConnection;

	constructor() {
		this.dbConn = new DatabaseConnection();
	}

	public async getUrgentDeadline(caseId: string): Promise<number> {
		const documents: DocumentEntity[] = await this.getAllByCaseId(caseId);
		if (documents.length === 0) return 0;
		const placeholderDate = Infinity;
		const currentDate = Date.now();
		let mostUrgentDeadline = placeholderDate;
		for (let i = 0, n = documents.length; i < n; i++) {
			if (documents[i].deadline === 0) continue;
			if (documents[i].deadline < currentDate) continue;
			if (documents[i].deadline > mostUrgentDeadline) continue;
			mostUrgentDeadline = documents[i].deadline;
		}
		if (mostUrgentDeadline === placeholderDate) return 0;
		return mostUrgentDeadline;
	}

	public async getAllByCaseId(caseId: string): Promise<DocumentEntity[]> {
		const caseDocuments: DocumentEntity[] = [];
		const documents: DocumentEntity[] = await this.dbConn.getArray(this.DOCUMENT_KEY);
		for (let i = 0, n = documents.length; i < n; i++) {
			if (documents[i].fk_case_id === caseId) {
				caseDocuments.push(documents[i]);
			}
		}
		return caseDocuments;
	}

	public async get(documentId: string): Promise<DocumentEntity | null> {
		const documents: DocumentEntity[] = await this.dbConn.getArray(this.DOCUMENT_KEY);
		for (let i = 0, n = documents.length; i < n; i++) {
			if (documents[i].document_id === documentId) {
				return documents[i];
			}
		}
		return null;
	}

	public async save(
		documentId: string,
		documentName: string,
		documentUrl: string,
		caseId: string
	): Promise<DocumentEntity | null> {
		const documents: DocumentEntity[] = await this.dbConn.getArray(this.DOCUMENT_KEY);
		const currentDateUnixMilliseconds = Date.now();
		const newDocument: DocumentEntity = {
			document_id: documentId,
			document_name: documentName,
			created_date: currentDateUnixMilliseconds,
			last_opened_date: currentDateUnixMilliseconds,
			status: DOCUMENT_STATUS.IN_PROGRESS,
			deadline: 0,
			url: documentUrl,
			fk_case_id: caseId,
		};
		const newDocumentsArr = [...documents, newDocument];
		const success = await this.dbConn.setArray(this.DOCUMENT_KEY, newDocumentsArr);
		if (success) {
			return newDocument;
		}
		return null;
	}

	public async updateStatus(caseId: string, documentId: string, newStatus: DocumentStatus): Promise<boolean> {
		const documents: DocumentEntity[] = await this.dbConn.getArray(this.DOCUMENT_KEY);
		for (let i = 0, n = documents.length; i < n; i++) {
			if (documents[i].fk_case_id === caseId && documents[i].document_id === documentId) {
				documents[i].status = newStatus;
			}
		}
		const success = await this.dbConn.setArray(this.DOCUMENT_KEY, documents);
		if (success) {
			return true;
		}
		return false;
	}

	public async updateName(caseId: string, documentId: string, newName: string): Promise<boolean> {
		const documents: DocumentEntity[] = await this.dbConn.getArray(this.DOCUMENT_KEY);
		for (let i = 0, n = documents.length; i < n; i++) {
			if (documents[i].fk_case_id === caseId && documents[i].document_id === documentId) {
				documents[i].document_name = newName;
			}
		}
		const success = await this.dbConn.setArray(this.DOCUMENT_KEY, documents);
		if (success) {
			return true;
		}
		return false;
	}

	public async updateDeadline(caseId: string, documentId: string, newDeadline: number): Promise<boolean> {
		const documents: DocumentEntity[] = await this.dbConn.getArray(this.DOCUMENT_KEY);
		for (let i = 0, n = documents.length; i < n; i++) {
			if (documents[i].fk_case_id === caseId && documents[i].document_id === documentId) {
				documents[i].deadline = newDeadline;
			}
		}
		const success = await this.dbConn.setArray(this.DOCUMENT_KEY, documents);
		if (success) {
			return true;
		}
		return false;
	}

	public async deleteAllByCaseId(caseId: string): Promise<boolean> {
		const newDocumentsArr: DocumentEntity[] = [];
		const documents: DocumentEntity[] = await this.dbConn.getArray(this.DOCUMENT_KEY);
		for (let i = 0, n = documents.length; i < n; i++) {
			if (documents[i].fk_case_id === caseId) {
				continue;
			}
			newDocumentsArr.push(documents[i]);
		}
		const success = await this.dbConn.setArray(this.DOCUMENT_KEY, newDocumentsArr);
		if (success) {
			return true;
		}
		return false;
	}

	public async delete(caseId: string, documentId: string): Promise<boolean> {
		const newDocumentsArr: DocumentEntity[] = [];
		const documents: DocumentEntity[] = await this.dbConn.getArray(this.DOCUMENT_KEY);
		for (let i = 0, n = documents.length; i < n; i++) {
			if (documents[i].fk_case_id === caseId && documents[i].document_id === documentId) {
				continue;
			}
			newDocumentsArr.push(documents[i]);
		}
		const success = await this.dbConn.setArray(this.DOCUMENT_KEY, newDocumentsArr);
		if (success) {
			return true;
		}
		return false;
	}
}
