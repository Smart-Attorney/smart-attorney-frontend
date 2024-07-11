import { CaseObj, DashboardCaseCardObj } from "../../../types/api";
import { DocumentUtils } from "../../../utils/document-utils";
import { Firebase } from "../../cloud-storage/firebase";
import { CaseLabelDAO } from "../case-label/case-label-dao";
import { ClientDAO } from "../client/client-dao";
import { DocumentDAO } from "../document/document-dao";
import { CasesDAO } from "./cases-dao";

export class CasesService {
	private casesDao: CasesDAO;
	private caseLabelDao: CaseLabelDAO;
	private documentDao: DocumentDAO;
	private clientDao: ClientDAO;

	constructor() {
		this.casesDao = new CasesDAO();
		this.caseLabelDao = new CaseLabelDAO();
		this.documentDao = new DocumentDAO();
		this.clientDao = new ClientDAO();
	}

	public async getAllByUserId(userId: string): Promise<DashboardCaseCardObj[]> {
		const userCases: DashboardCaseCardObj[] = [];
		const cases = await this.casesDao.getAllByUserId(userId);
		for (let i = 0, n = cases.length; i < n; i++) {
			const caseId = cases[i].case_id;
			const labels = await this.caseLabelDao.getAllByCaseId(caseId);
			const documents = await this.documentDao.getAllByCaseId(caseId);
			const urgentDeadline = DocumentUtils.getUrgentDeadline(documents);
			userCases.push({
				id: cases[i].case_id,
				name: cases[i].case_name,
				createdDate: cases[i].created_date,
				lastOpenedDate: cases[i].last_opened_date,
				isOpen: cases[i].is_open,
				urgentDocumentDeadline: urgentDeadline,
				labels: labels,
				documents: documents,
			});
		}
		return userCases;
	}

	public async getById(caseId: string): Promise<DashboardCaseCardObj | null> {
		if (!caseId) return null;
		const caseFolder = await this.casesDao.getById(caseId);
		if (caseFolder !== null) {
			const labels = await this.caseLabelDao.getAllByCaseId(caseId);
			const documents = await this.documentDao.getAllByCaseId(caseId);
			const urgentDeadline = DocumentUtils.getUrgentDeadline(documents);
			const retrievedCase: DashboardCaseCardObj = {
				...caseFolder,
				urgentDocumentDeadline: urgentDeadline,
				labels: labels,
				documents: documents,
			};
			return retrievedCase;
		}
		return null;
	}

	public async create(userId: string, caseId: string, caseName: string): Promise<CaseObj | null> {
		if (!userId || !caseId || !caseName) return null;
		const isCaseCreated = await this.casesDao.add(userId, caseId, caseName);
		if (isCaseCreated) {
			return this.getById(caseId);
		}
		return null;
	}

	public async createLabel(userId: string, caseId: string, newLabel: string): Promise<DashboardCaseCardObj | null> {
		if (!userId || !caseId || !newLabel) return null;
		const isLabelCreated = await this.caseLabelDao.add(caseId, newLabel);
		if (isLabelCreated) {
			return await this.getById(caseId);
		}
		return null;
	}

	public async updateLastOpenedDate(userId: string, caseId: string): Promise<number | null> {
		if (!userId || !caseId) return null;
		const isDateUpdated = await this.casesDao.updateLastOpenedDate(userId, caseId);
		if (isDateUpdated !== null) {
			return isDateUpdated;
		}
		return null;
	}

	public async updateName(userId: string, caseId: string, newName: string): Promise<DashboardCaseCardObj | null> {
		if (!userId || !caseId || !newName) return null;
		const isNameUpdated = await this.casesDao.updateName(userId, caseId, newName);
		if (isNameUpdated) {
			return await this.getById(caseId);
		}
		return null;
	}

	public async updateOpenStatus(
		userId: string,
		caseId: string,
		currentState: boolean
	): Promise<DashboardCaseCardObj | null> {
		if (!userId || !caseId || typeof currentState !== "boolean") return null;
		const isStatusUpdated = await this.casesDao.updateOpenState(userId, caseId, currentState);
		if (isStatusUpdated) {
			return await this.getById(caseId);
		}
		return null;
	}

	public async deleteLabelById(userId: string, caseId: string, labelId: string): Promise<DashboardCaseCardObj | null> {
		if (!userId || !caseId || !labelId) return null;
		const isLabelDeleted = await this.caseLabelDao.deleteById(caseId, labelId);
		if (isLabelDeleted) {
			return await this.getById(caseId);
		}
		return null;
	}

	public async deleteById(userId: string, caseId: string): Promise<DashboardCaseCardObj | null> {
		if (!userId || !caseId) return null;
		const deletedCase = await this.getById(caseId);

		// delete all files from cloud storage associated with caseId
		const cloudFiles = await this.documentDao.getAllByCaseId(caseId);
		const promiseArray = [];
		for (let i = 0, n = cloudFiles.length; i < n; i++) {
			promiseArray.push(await Firebase.deleteFileById(userId, caseId, cloudFiles[i].id));
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
		const isCaseDeleted = await this.casesDao.deleteById(userId, caseId);
		if (isCaseDeleted) {
			return deletedCase;
		}
		return null;
	}
}
