import { ShortUuid } from "../../../lib/short-uuid";
import { Uuid } from "../../../lib/uuid";
import { Document, DocumentStatus } from "../../../types/api";
import { Firebase } from "../../cloud-storage/firebase";
import { CasesDAO } from "../cases/cases-dao";
import { DocumentDAO } from "./document-dao";

export class DocumentService {
	private documentDao: DocumentDAO;
	private casesDao: CasesDAO;
	private uuid: Uuid;
	private shortUuid: ShortUuid;

	constructor() {
		this.documentDao = new DocumentDAO();
		this.casesDao = new CasesDAO();
		this.uuid = new Uuid();
		this.shortUuid = new ShortUuid();
	}

	public async getAllDocumentsByUserId(userShortId: string): Promise<Document[] | null> {
		if (!userShortId) return null;
		const userUuid = this.shortUuid.toUUID(userShortId);
		if (!this.uuid.isValid(userUuid)) return null;
		const userDocuments: Document[] = [];
		const userCases = await this.casesDao.getAllByUserId(userUuid);
		for (let i = 0, n = userCases.length; i < n; i++) {
			const documents = await this.documentDao.getAllByCaseId(userCases[i].case_id);
			if (!documents) continue;
			for (let i = 0, n = documents.length; i < n; i++) {
				userDocuments.push({
					id: this.shortUuid.toShort(documents[i].document_id),
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

	public async getAllDocumentsByCaseId(caseShortId: string): Promise<Document[] | null> {
		if (!caseShortId) return null;
		const caseUuid = this.shortUuid.toUUID(caseShortId);
		if (!this.uuid.isValid(caseUuid)) return null;
		const documents = await this.documentDao.getAllByCaseId(caseUuid);
		const retrievedDocuments: Document[] = documents.map((document) => ({
			id: this.shortUuid.toShort(document.document_id),
			name: document.document_name,
			createdDate: document.created_date,
			lastOpenedDate: document.last_opened_date,
			status: document.status,
			deadline: document.deadline,
			url: document.url,
		}));
		return retrievedDocuments;
	}

	public async getDocument(documentShortId: string): Promise<Document | null> {
		if (!documentShortId) return null;
		const documentUuid = this.shortUuid.toUUID(documentShortId);
		if (!this.uuid.isValid(documentUuid)) return null;
		const document = await this.documentDao.get(documentUuid);
		if (document !== null) {
			const retrievedDocument: Document = {
				id: this.shortUuid.toShort(document.document_id),
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

	public async addDocument(userShortId: string, caseShortId: string, files: File[]): Promise<Document[] | null> {
		if (!userShortId || !caseShortId || !files) return null;
		const userUuid = this.shortUuid.toUUID(userShortId);
		const caseUuid = this.shortUuid.toUUID(caseShortId);
		if (!this.uuid.isValid(userUuid) || !this.uuid.isValid(caseUuid)) return null;
		const documents: Document[] = [];
		for (let i = 0, n = files.length; i < n; i++) {
			const documentUuid = this.uuid.generate(); // uuid to store as document id in database
			const documentShortId = this.shortUuid.toShort(documentUuid); // short uuid to store as id in firebase
			const { name } = files[i];
			const documentName = name.split("/")[1];
			const documentUrl = await Firebase.uploadFile(userShortId, caseShortId, documentShortId, files[i]);
			if (documentUrl === null) return null;
			const newDocumentUuid = await this.documentDao.save(documentUuid, documentName, documentUrl, caseUuid);
			if (newDocumentUuid === null) return null;
			const newDocument = await this.getDocument(documentShortId);
			if (newDocument !== null) {
				documents.push(newDocument);
			}
		}
		return documents;
	}

	public async updateDocumentStatus(documentShortId: string, newStatus: DocumentStatus): Promise<Document | null> {
		if (!documentShortId || !newStatus) return null;
		const documentUuid = this.shortUuid.toUUID(documentShortId);
		if (!this.uuid.isValid(documentUuid)) return null;
		const isUpdated = await this.documentDao.updateStatus(documentUuid, newStatus);
		if (isUpdated) {
			return await this.getDocument(documentShortId);
		}
		return null;
	}

	public async updateDocumentName(documentShortId: string, newName: string): Promise<Document | null> {
		if (!documentShortId || !newName) return null;
		const documentUuid = this.shortUuid.toUUID(documentShortId);
		if (!this.uuid.isValid(documentUuid)) return null;
		const isUpdated = await this.documentDao.updateName(documentUuid, newName);
		if (isUpdated) {
			return await this.getDocument(documentShortId);
		}
		return null;
	}

	public async updateDocumentDeadline(documentShortId: string, newDeadline: number): Promise<Document | null> {
		if (!documentShortId || !newDeadline) return null;
		const documentUuid = this.shortUuid.toUUID(documentShortId);
		if (!this.uuid.isValid(documentUuid)) return null;
		const isUpdated = await this.documentDao.updateDeadline(documentUuid, newDeadline);
		if (isUpdated) {
			return await this.getDocument(documentShortId);
		}
		return null;
	}

	public async deleteDocument(
		userShortId: string,
		caseShortId: string,
		documentShortId: string
	): Promise<Document | null> {
		if (!userShortId || !caseShortId || !documentShortId) return null;
		const userUuid = this.shortUuid.toUUID(userShortId);
		const caseUuid = this.shortUuid.toUUID(caseShortId);
		const documentUuid = this.shortUuid.toUUID(documentShortId);
		if (!this.uuid.isValid(userUuid) || !this.uuid.isValid(caseUuid) || !this.uuid.isValid(documentUuid)) return null;
		const isCloudFileDeleted = await Firebase.deleteFileById(userShortId, caseShortId, documentShortId);
		if (!isCloudFileDeleted) return null;
		const deletedDocument = await this.getDocument(documentShortId);
		const isDeleted = await this.documentDao.delete(documentUuid);
		if (isDeleted) {
			return deletedDocument;
		}
		return null;
	}
}
