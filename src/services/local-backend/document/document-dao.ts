import { DOCUMENT_STATUS } from "../../../utils/constants/document-status";
import { DatabaseConnection } from "../../local-database/database-connection";
import { document_status, DocumentEntity } from "../../local-database/entities";
import { SqlTables } from "../../local-database/sql-tables";

export class DocumentDAO {
	private DOCUMENT_KEY = SqlTables.TABLE.DOCUMENT;
	private dbConn: DatabaseConnection;

	constructor() {
		this.dbConn = new DatabaseConnection();
	}

	public async getUrgentDeadline(caseUuid: string): Promise<number> {
		const documents: DocumentEntity[] = await this.getAllByCaseId(caseUuid);
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

	public async getAllByCaseId(caseUuid: string): Promise<DocumentEntity[]> {
		const caseDocuments: DocumentEntity[] = [];
		const documents: DocumentEntity[] = await this.dbConn.getArray(this.DOCUMENT_KEY);
		for (let i = 0, n = documents.length; i < n; i++) {
			if (documents[i].fk_case_id === caseUuid) {
				caseDocuments.push(documents[i]);
			}
		}
		return caseDocuments;
	}

	public async get(documentUuid: string): Promise<DocumentEntity | null> {
		const documents: DocumentEntity[] = await this.dbConn.getArray(this.DOCUMENT_KEY);
		for (let i = 0, n = documents.length; i < n; i++) {
			if (documents[i].document_id === documentUuid) {
				return documents[i];
			}
		}
		return null;
	}

	public async save(
		documentUuid: string,
		documentName: string,
		documentUrl: string,
		caseUuid: string
	): Promise<string | null> {
		const documents: DocumentEntity[] = await this.dbConn.getArray(this.DOCUMENT_KEY);
		const currentDateUnixMilliseconds = Date.now();
		const newDocument: DocumentEntity = {
			document_id: documentUuid,
			document_name: documentName,
			created_date: currentDateUnixMilliseconds,
			last_opened_date: currentDateUnixMilliseconds,
			status: DOCUMENT_STATUS.IN_PROGRESS,
			deadline: 0,
			url: documentUrl,
			fk_case_id: caseUuid,
		};
		const newDocumentsArr = [...documents, newDocument];
		const success = await this.dbConn.setArray(this.DOCUMENT_KEY, newDocumentsArr);
		if (success) {
			return newDocument.document_id;
		}
		return null;
	}

	public async updateStatus(documentUuid: string, newStatus: document_status): Promise<boolean> {
		const documents: DocumentEntity[] = await this.dbConn.getArray(this.DOCUMENT_KEY);
		for (let i = 0, n = documents.length; i < n; i++) {
			if (documents[i].document_id === documentUuid) {
				documents[i].status = newStatus;
				break;
			}
		}
		const success = await this.dbConn.setArray(this.DOCUMENT_KEY, documents);
		if (success) {
			return true;
		}
		return false;
	}

	public async updateName(documentUuid: string, newName: string): Promise<boolean> {
		const documents: DocumentEntity[] = await this.dbConn.getArray(this.DOCUMENT_KEY);
		for (let i = 0, n = documents.length; i < n; i++) {
			if (documents[i].document_id === documentUuid) {
				documents[i].document_name = newName;
				break;
			}
		}
		const success = await this.dbConn.setArray(this.DOCUMENT_KEY, documents);
		if (success) {
			return true;
		}
		return false;
	}

	public async updateDeadline(documentUuid: string, newDeadline: number): Promise<boolean> {
		const documents: DocumentEntity[] = await this.dbConn.getArray(this.DOCUMENT_KEY);
		for (let i = 0, n = documents.length; i < n; i++) {
			if (documents[i].document_id === documentUuid) {
				documents[i].deadline = newDeadline;
				break;
			}
		}
		const success = await this.dbConn.setArray(this.DOCUMENT_KEY, documents);
		if (success) {
			return true;
		}
		return false;
	}

	public async updateLastOpenedDate(documentUuid: string, newLastOpenedDate: number): Promise<boolean> {
		const documents: DocumentEntity[] = await this.dbConn.getArray(this.DOCUMENT_KEY);
		for (let i = 0, n = documents.length; i < n; i++) {
			if (documents[i].document_id === documentUuid) {
				documents[i].last_opened_date = newLastOpenedDate;
				break;
			}
		}
		const success = await this.dbConn.setArray(this.DOCUMENT_KEY, documents);
		if (success) {
			return true;
		}
		return false;
	}

	public async deleteAllByCaseId(caseUuid: string): Promise<boolean> {
		const newDocumentsArr: DocumentEntity[] = [];
		const documents: DocumentEntity[] = await this.dbConn.getArray(this.DOCUMENT_KEY);
		for (let i = 0, n = documents.length; i < n; i++) {
			if (documents[i].fk_case_id === caseUuid) {
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

	public async delete(documentUuid: string): Promise<boolean> {
		const newDocumentsArr: DocumentEntity[] = [];
		const documents: DocumentEntity[] = await this.dbConn.getArray(this.DOCUMENT_KEY);
		for (let i = 0, n = documents.length; i < n; i++) {
			if (documents[i].document_id === documentUuid) {
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
