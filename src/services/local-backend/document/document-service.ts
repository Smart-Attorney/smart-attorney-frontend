import { Document, DocumentStatus } from "../../../types/api";
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

	public async getAllDocumentsByUserId(userId: string): Promise<Document[] | null> {
		if (!userId) return null;
		const userDocuments: Document[] = [];
		const userCases = await this.casesDao.getAllByUserId(userId);
		for (let i = 0, n = userCases.length; i < n; i++) {
			const documents = await this.documentDao.getAllByCaseId(userCases[i].case_id);
			if (!documents) continue;
			for (let i = 0, n = documents.length; i < n; i++) {
				userDocuments.push({
					id: documents[i].document_id,
					name: documents[i].document_name,
					createdDate: documents[i].created_date,
					lastOpenedDate: documents[i].last_opened_date,
					status: documents[i].status,
					deadline: documents[i].deadline,
					url: documents[i].url,
				});
			}
		}
		return userDocuments;
	}

	public async getAllDocumentsByCaseId(caseId: string): Promise<Document[] | null> {
		if (!caseId) return null;
		const documents = await this.documentDao.getAllByCaseId(caseId);
		const retrievedDocuments: Document[] = documents.map((document) => ({
			id: document.document_id,
			name: document.document_name,
			createdDate: document.created_date,
			lastOpenedDate: document.last_opened_date,
			status: document.status,
			deadline: document.deadline,
			url: document.url,
		}));
		return retrievedDocuments;
	}

	public async getDocument(documentId: string): Promise<Document | null> {
		if (!documentId) return null;
		const document = await this.documentDao.get(documentId);
		if (document !== null) {
			const retrievedDocument: Document = {
				id: document.document_id,
				name: document.document_name,
				createdDate: document.created_date,
				lastOpenedDate: document.last_opened_date,
				status: document.status,
				deadline: document.deadline,
				url: document.url,
			};
			return retrievedDocument;
		}
		return null;
	}

	public async addDocument(userId: string, caseId: string, files: File[]): Promise<Document[] | null> {
		if (!caseId || !files) return null;
		const documents: Document[] = [];
		for (let i = 0, n = files.length; i < n; i++) {
			const { name } = files[i];
			const fileId = name.split("/")[0];
			const fileName = name.split("/")[1];
			const fileUrl = await Firebase.uploadFile(userId, caseId, fileId, files[i]);
			if (fileUrl === null) return null;
			const newDocument = await this.documentDao.save(fileId, fileName, fileUrl, caseId);
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

	public async updateDocumentStatus(
		caseId: string,
		documentId: string,
		newStatus: DocumentStatus
	): Promise<Document | null> {
		if (!caseId || !documentId || !newStatus) return null;
		const isUpdated = await this.documentDao.updateStatus(caseId, documentId, newStatus);
		if (isUpdated) {
			return this.getDocument(documentId);
		}
		return null;
	}

	public async updateDocumentName(caseId: string, documentId: string, newName: string): Promise<Document | null> {
		if (!caseId || !documentId || !newName) return null;
		const isUpdated = await this.documentDao.updateName(caseId, documentId, newName);
		if (isUpdated) {
			return this.getDocument(documentId);
		}
		return null;
	}

	public async updateDocumentDeadline(
		caseId: string,
		documentId: string,
		newDeadline: number
	): Promise<Document | null> {
		if (!caseId || !documentId || !newDeadline) return null;
		const isUpdated = await this.documentDao.updateDeadline(caseId, documentId, newDeadline);
		if (isUpdated) {
			return this.getDocument(documentId);
		}
		return null;
	}

	public async deleteDocument(userId: string, caseId: string, documentId: string): Promise<Document | null> {
		if (!userId || !caseId || !documentId) return null;
		const isFileDeletedFromCloud = await Firebase.deleteFileById(userId, caseId, documentId);
		if (!isFileDeletedFromCloud) return null;
		const deletedDocument = await this.getDocument(documentId);
		const isDeleted = await this.documentDao.delete(caseId, documentId);
		if (isDeleted) {
			return deletedDocument;
		}
		return null;
	}
}
