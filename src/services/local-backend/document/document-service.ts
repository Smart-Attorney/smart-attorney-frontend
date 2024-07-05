import { DocumentObj, DocumentStatus } from "../../../utils/types";
import { Firebase } from "../../cloud-storage/firebase";
import { CasesDAO } from "../cases/cases-dao";
import { DocumentDAO } from "./document-dao";

export class DocumentService {
	private documentDao: DocumentDAO;
	private casesDao: CasesDAO;

	constructor() {
		this.documentDao = new DocumentDAO();
		this.casesDao = new CasesDAO();
	}

	public async create(userId: string, caseId: string, files: File[]): Promise<DocumentObj[] | null> {
		if (!caseId || !files) return null;
		const documents: DocumentObj[] = [];
		for (let i = 0, n = files.length; i < n; i++) {
			const { name } = files[i];
			const fileId = name.split("/")[0];
			const fileName = name.split("/")[1];
			const fileUrl = await Firebase.uploadFile(userId, caseId, fileId, files[i]);
			if (fileUrl === null) return null;
			const newDocument = await this.documentDao.add(fileId, fileName, fileUrl, caseId);
			if (newDocument === null) return null;
			documents.push({
				id: newDocument.document_id,
				name: newDocument.document_name,
				createdDate: newDocument.created_date,
				lastOpenedDate: newDocument.last_opened_date,
				status: newDocument.status,
				deadline: newDocument.deadline,
				url: newDocument.url,
			});
		}
		return documents;
	}

	public async getAllByCaseId(caseId: string): Promise<DocumentObj[] | null> {
		if (!caseId) return null;
		const retrievedDocuments = await this.documentDao.getAllByCaseId(caseId);
		return retrievedDocuments;
	}

	public async getById(userId: string, caseId: string, documentId: string): Promise<DocumentObj | null> {
		if (!userId || !caseId || !documentId) return null;
		const retrievedDocument = await this.documentDao.getById(caseId, documentId);
		if (retrievedDocument !== null) {
			return retrievedDocument;
		}
		return null;
	}

	public async getAllByUserId(userId: string): Promise<DocumentObj[] | null> {
		if (!userId) return null;
		const userDocuments: DocumentObj[] = [];
		const userCases = await this.casesDao.getAllByUserId(userId);
		for (let i = 0, n = userCases.length; i < n; i++) {
			const documents = await this.documentDao.getAllByCaseId(userCases[i].case_id);
			if (!documents) continue;
			for (let i = 0, n = documents.length; i < n; i++) {
				userDocuments.push(documents[i]);
			}
		}
		return userDocuments;
	}

	public async updateStatus(
		caseId: string,
		documentId: string,
		newStatus: DocumentStatus
	): Promise<DocumentObj | null> {
		if (!caseId || !documentId || !newStatus) return null;
		const isUpdated = await this.documentDao.updateStatus(caseId, documentId, newStatus);
		if (isUpdated) {
			return this.documentDao.getById(caseId, documentId);
		}
		return null;
	}

	public async updateName(caseId: string, documentId: string, newName: string): Promise<DocumentObj | null> {
		if (!caseId || !documentId || !newName) return null;
		const isUpdated = await this.documentDao.updateName(caseId, documentId, newName);
		if (isUpdated) {
			return this.documentDao.getById(caseId, documentId);
		}
		return null;
	}

	public async updateDeadline(caseId: string, documentId: string, newDeadline: number): Promise<DocumentObj | null> {
		if (!caseId || !documentId || !newDeadline) return null;
		const isUpdated = await this.documentDao.updateDeadline(caseId, documentId, newDeadline);
		if (isUpdated) {
			return this.documentDao.getById(caseId, documentId);
		}
		return null;
	}

	public async deleteById(userId: string, caseId: string, documentId: string): Promise<DocumentObj | null> {
		if (!userId || !caseId || !documentId) return null;
		const isFileDeletedFromCloud = await Firebase.deleteFileById(userId, caseId, documentId);
		if (!isFileDeletedFromCloud) return null;
		const deletedDocument = await this.documentDao.getById(caseId, documentId);
		const isDeleted = await this.documentDao.deleteById(caseId, documentId);
		if (isDeleted) {
			return deletedDocument;
		}
		return null;
	}
}
