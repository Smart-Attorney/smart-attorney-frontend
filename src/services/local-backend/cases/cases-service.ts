import { DashboardCaseCardObj, DocumentObj } from "../../../types/api";
import { Firebase } from "../../cloud-storage/firebase";
import { CaseLabelDAO } from "../case-label/case-label-dao";
import { ClientDAO } from "../client/client-dao";
import { DocumentDAO } from "../document/document-dao";
import { CasesDAO } from "./cases-dao";

export class CasesService {
	private casesDao: CasesDAO;
	private caseLabelDao: CaseLabelDAO;
	private clientDao: ClientDAO;
	private documentDao: DocumentDAO;

	constructor() {
		this.casesDao = new CasesDAO();
		this.caseLabelDao = new CaseLabelDAO();
		this.clientDao = new ClientDAO();
		this.documentDao = new DocumentDAO();
	}

	public async getAllCasesByUserId(userId: string): Promise<DashboardCaseCardObj[]> {
		const userCases: DashboardCaseCardObj[] = [];
		const cases = await this.casesDao.getAllByUserId(userId);
		for (let i = 0, n = cases.length; i < n; i++) {
			const caseId = cases[i].case_id;
			const urgentDeadline = await this.documentDao.getUrgentDeadline(caseId);
			const labels = await this.caseLabelDao.getAllByCaseId(caseId);
			const documents = await this.documentDao.getAllByCaseId(caseId);
			const caseDocuments: DocumentObj[] = documents.map((document) => ({
				id: document.document_id,
				name: document.document_name,
				createdDate: document.created_date,
				lastOpenedDate: document.last_opened_date,
				status: document.status,
				deadline: document.deadline,
				url: document.url,
			}));
			userCases.push({
				id: cases[i].case_id,
				name: cases[i].case_name,
				createdDate: cases[i].created_date,
				lastOpenedDate: cases[i].last_opened_date,
				isOpen: cases[i].is_open,
				urgentDocumentDeadline: urgentDeadline,
				labels: labels,
				documents: caseDocuments,
			});
		}
		return userCases;
	}

	public async getCase(caseId: string): Promise<DashboardCaseCardObj | null> {
		if (!caseId) return null;
		const caseFolder = await this.casesDao.get(caseId);
		if (caseFolder !== null) {
			const urgentDeadline = await this.documentDao.getUrgentDeadline(caseId);
			const labels = await this.caseLabelDao.getAllByCaseId(caseId);
			const documents = await this.documentDao.getAllByCaseId(caseId);
			const caseDocuments: DocumentObj[] = documents.map((document) => ({
				id: document.document_id,
				name: document.document_name,
				createdDate: document.created_date,
				lastOpenedDate: document.last_opened_date,
				status: document.status,
				deadline: document.deadline,
				url: document.url,
			}));
			const retrievedCase: DashboardCaseCardObj = {
				id: caseFolder.case_id,
				name: caseFolder.case_name,
				createdDate: caseFolder.created_date,
				lastOpenedDate: caseFolder.last_opened_date,
				isOpen: caseFolder.is_open,
				urgentDocumentDeadline: urgentDeadline,
				labels: labels,
				documents: caseDocuments,
			};
			return retrievedCase;
		}
		return null;
	}

	public async addCase(userId: string, caseName: string): Promise<DashboardCaseCardObj | null> {
		if (!userId || !caseName) return null;
		const newCaseId = await this.casesDao.save(userId, caseName);
		if (newCaseId !== null) {
			return this.getCase(newCaseId);
		}
		return null;
	}

	public async updateCaseLastOpenedDate(userId: string, caseId: string): Promise<number | null> {
		if (!userId || !caseId) return null;
		const isDateUpdated = await this.casesDao.updateLastOpenedDate(userId, caseId);
		if (isDateUpdated !== null) {
			return isDateUpdated;
		}
		return null;
	}

	public async updateCaseName(userId: string, caseId: string, newName: string): Promise<DashboardCaseCardObj | null> {
		if (!userId || !caseId || !newName) return null;
		const isNameUpdated = await this.casesDao.updateName(userId, caseId, newName);
		if (isNameUpdated) {
			return await this.getCase(caseId);
		}
		return null;
	}

	public async updateCaseIsOpen(
		userId: string,
		caseId: string,
		currentState: boolean
	): Promise<DashboardCaseCardObj | null> {
		if (!userId || !caseId || typeof currentState !== "boolean") return null;
		const isStatusUpdated = await this.casesDao.updateOpenState(userId, caseId, currentState);
		if (isStatusUpdated) {
			return await this.getCase(caseId);
		}
		return null;
	}

	public async deleteCase(userId: string, caseId: string): Promise<DashboardCaseCardObj | null> {
		if (!userId || !caseId) return null;
		const deletedCase = await this.getCase(caseId);

		// delete all files from cloud storage associated with caseId
		const cloudFiles = await this.documentDao.getAllByCaseId(caseId);
		const promiseArray = [];
		for (let i = 0, n = cloudFiles.length; i < n; i++) {
			promiseArray.push(await Firebase.deleteFileById(userId, caseId, cloudFiles[i].document_id));
		}
		const cloudFilesDeletedSuccessfully = await Promise.all(promiseArray);
		if (cloudFilesDeletedSuccessfully.includes(false)) return null;

		// delete all documents associated with caseId
		const isDocumentsDeleted = await this.documentDao.deleteAllByCaseId(caseId);
		if (!isDocumentsDeleted) return null;

		// delete all labels associated with caseId
		const isLabelsDeleted = await this.caseLabelDao.deleteAllByCaseId(caseId);
		if (!isLabelsDeleted) return null;

		// delete all clients associated with caseId
		const isClientDeleted = await this.clientDao.deleteByCaseId(caseId);
		if (!isClientDeleted) return null;

		// delete case after all associated entities have been deleted
		const isCaseDeleted = await this.casesDao.delete(userId, caseId);
		if (isCaseDeleted) {
			return deletedCase;
		}
		return null;
	}
}
