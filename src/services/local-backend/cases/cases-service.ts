import { ShortUuid } from "../../../lib/short-uuid";
import { Uuid } from "../../../lib/uuid";
import { Case, CaseLabel, Document } from "../../../types/api";
import { CaseLabelDAO } from "../case-label/case-label-dao";
import { DocumentDAO } from "../document/document-dao";
import { CasesDAO } from "./cases-dao";

export class CasesService {
	private casesDao: CasesDAO;
	private caseLabelDao: CaseLabelDAO;
	private documentDao: DocumentDAO;
	private shortUuid: ShortUuid;
	private uuid: Uuid;

	constructor() {
		this.casesDao = new CasesDAO();
		this.caseLabelDao = new CaseLabelDAO();
		this.documentDao = new DocumentDAO();
		this.shortUuid = new ShortUuid();
		this.uuid = new Uuid();
	}

	public async getAllCasesByUserId(userShortId: string): Promise<Case[] | null> {
		if (!userShortId) return null;
		const userUuid = this.shortUuid.toUUID(userShortId);
		if (!this.uuid.isValid(userUuid)) return null;
		const userCases: Case[] = [];
		const cases = await this.casesDao.getAllByUserId(userUuid);
		for (let i = 0, n = cases.length; i < n; i++) {
			const caseUuid = cases[i].case_id;
			const urgentDeadline = await this.documentDao.getUrgentDeadline(caseUuid);
			const labels = await this.caseLabelDao.getAllByCaseId(caseUuid);
			const caseLabels: CaseLabel[] = labels.map((label) => ({
				id: this.shortUuid.toShort(label.label_id),
				name: label.label_name,
			}));
			const documents = await this.documentDao.getAllByCaseId(caseUuid);
			const caseDocuments: Document[] = documents.map((document) => ({
				id: this.shortUuid.toShort(document.document_id),
				name: document.document_name,
				createdDate: document.created_date,
				lastOpenedDate: document.last_opened_date,
				status: document.status,
				deadline: document.deadline,
				url: document.url,
			}));
			userCases.push({
				id: this.shortUuid.toShort(cases[i].case_id),
				name: cases[i].case_name,
				createdDate: cases[i].created_date,
				lastOpenedDate: cases[i].last_opened_date,
				isOpen: cases[i].is_open,
				urgentDocumentDeadline: urgentDeadline,
				labels: caseLabels,
				documents: caseDocuments,
			});
		}
		return userCases;
	}

	public async getCase(caseShortId: string): Promise<Case | null> {
		if (!caseShortId) return null;
		const caseUuid = this.shortUuid.toUUID(caseShortId);
		if (!this.uuid.isValid(caseUuid)) return null;
		const caseFolder = await this.casesDao.get(caseUuid);
		if (caseFolder !== null) {
			const urgentDeadline = await this.documentDao.getUrgentDeadline(caseUuid);
			const labels = await this.caseLabelDao.getAllByCaseId(caseUuid);
			const caseLabels: CaseLabel[] = labels.map((label) => ({
				id: this.shortUuid.toShort(label.label_id),
				name: label.label_name,
			}));
			const documents = await this.documentDao.getAllByCaseId(caseUuid);
			const caseDocuments: Document[] = documents.map((document) => ({
				id: this.shortUuid.toShort(document.document_id),
				name: document.document_name,
				createdDate: document.created_date,
				lastOpenedDate: document.last_opened_date,
				status: document.status,
				deadline: document.deadline,
				url: document.url,
			}));
			const retrievedCase: Case = {
				id: this.shortUuid.toShort(caseFolder.case_id),
				name: caseFolder.case_name,
				createdDate: caseFolder.created_date,
				lastOpenedDate: caseFolder.last_opened_date,
				isOpen: caseFolder.is_open,
				urgentDocumentDeadline: urgentDeadline,
				labels: caseLabels,
				documents: caseDocuments,
			};
			return retrievedCase;
		}
		return null;
	}

	public async addCase(userShortId: string, caseName: string): Promise<Case | null> {
		if (!userShortId || !caseName) return null;
		const userUuid = this.shortUuid.toUUID(userShortId);
		if (!this.uuid.isValid(userUuid)) return null;
		const newCaseUuid = await this.casesDao.save(userUuid, caseName);
		if (newCaseUuid !== null) {
			const newCaseShortId = this.shortUuid.toShort(newCaseUuid);
			return await this.getCase(newCaseShortId);
		}
		return null;
	}

	public async updateCaseLastOpenedDate(caseShortId: string, newLastOpenedDate: number): Promise<Case | null> {
		if (!caseShortId || !newLastOpenedDate) return null;
		const caseUuid = this.shortUuid.toUUID(caseShortId);
		if (!this.uuid.isValid(caseUuid)) return null;
		const isDateUpdated = await this.casesDao.updateLastOpenedDate(caseUuid, newLastOpenedDate);
		if (isDateUpdated !== null) {
			return await this.getCase(caseShortId);
		}
		return null;
	}

	public async updateCaseName(caseShortId: string, newName: string): Promise<Case | null> {
		if (!caseShortId || !newName) return null;
		const caseUuid = this.shortUuid.toUUID(caseShortId);
		if (!this.uuid.isValid(caseUuid)) return null;
		const isNameUpdated = await this.casesDao.updateName(caseUuid, newName);
		if (isNameUpdated) {
			return await this.getCase(caseShortId);
		}
		return null;
	}

	public async updateCaseIsOpen(caseShortId: string, currentState: boolean): Promise<Case | null> {
		if (!caseShortId || typeof currentState !== "boolean") return null;
		const caseUuid = this.shortUuid.toUUID(caseShortId);
		if (!this.uuid.isValid(caseUuid)) return null;
		const isStatusUpdated = await this.casesDao.updateOpenState(caseUuid, currentState);
		if (isStatusUpdated) {
			return await this.getCase(caseShortId);
		}
		return null;
	}

	public async deleteCase(userShortId: string, caseShortId: string): Promise<Case | null> {
		if (!userShortId || !caseShortId) return null;
		const userUuid = this.shortUuid.toUUID(userShortId);
		const caseUuid = this.shortUuid.toUUID(caseShortId);
		if (!this.uuid.isValid(userUuid) || !this.uuid.isValid(caseUuid)) return null;

		// store the case that is to be deleted in memory
		const deletedCase = await this.getCase(caseShortId);

		// delete all documents from cloud storage associated with case id
		// const documents = await this.documentDao.getAllByCaseId(caseUuid);
		// const promiseArray = [];
		// for (let i = 0, n = documents.length; i < n; i++) {
		// 	const documentShortId = this.shortUuid.toShort(documents[i].document_id);
		// 	promiseArray.push(await Firebase.deleteFileById(userShortId, caseShortId, documentShortId));
		// }
		// const areCloudDocumentsDeleted = await Promise.all(promiseArray);
		// if (areCloudDocumentsDeleted.includes(false)) return null;

		// delete all documents associated with case id
		// const areDocumentsDeleted = await this.documentDao.deleteAllByCaseId(caseUuid);
		// if (!areDocumentsDeleted) return null;

		// delete all labels associated with case id
		// const areLabelsDeleted = await this.caseLabelDao.deleteAllByCaseId(caseUuid);
		// if (!areLabelsDeleted) return null;

		// delete all clients associated with case id
		// const isClientDeleted = await this.clientDao.deleteByCaseId(caseUuid);
		// if (!isClientDeleted) return null;

		// delete case after all associated entities have been deleted
		const isCaseDeleted = await this.casesDao.delete(caseUuid);
		if (isCaseDeleted) {
			return deletedCase;
		}
		return null;
	}
}
