import { DocumentUtils } from "../../../utils/document-utils";
import { CaseFolderObj, DashboardFolderCardObj } from "../../../utils/types";
import { Firebase } from "../../cloud-storage/firebase";
import { CaseLabelDAO } from "../case-label/case-label-dao";
import { ClientDAO } from "../client/client-dao";
import { CaseFileDAO } from "../document/case-file-dao";
import { CaseFolderDAO } from "./case-folder-dao";

export class CaseFolderService {
	static async getAllByUserId(userId: string): Promise<DashboardFolderCardObj[]> {
		const userCases: DashboardFolderCardObj[] = [];
		const cases = await CaseFolderDAO.getAllByUserId(userId);
		for (let i = 0, n = cases.length; i < n; i++) {
			const folderId = cases[i].folder_id;
			const labels = await CaseLabelDAO.getAllByCaseId(folderId);
			const documents = await CaseFileDAO.getAllByCaseId(folderId);
			const urgentDeadline = DocumentUtils.getUrgentDeadline(documents);
			userCases.push({
				id: cases[i].folder_id,
				name: cases[i].folder_name,
				createdDate: cases[i].created_date,
				lastOpenedDate: cases[i].last_opened_date,
				status: cases[i].status,
				urgentDocumentDeadline: urgentDeadline,
				labels: labels,
				files: documents,
			});
		}
		return userCases;
	}

	static async getById(folderId: string): Promise<DashboardFolderCardObj | null> {
		if (!folderId) return null;
		const caseFolder = await CaseFolderDAO.getById(folderId);
		if (caseFolder !== null) {
			const labels = await CaseLabelDAO.getAllByCaseId(folderId);
			const documents = await CaseFileDAO.getAllByCaseId(folderId);
			const urgentDeadline = DocumentUtils.getUrgentDeadline(documents);
			const retrievedCaseFolder: DashboardFolderCardObj = {
				...caseFolder,
				urgentDocumentDeadline: urgentDeadline,
				labels: labels,
				files: documents,
			};
			return retrievedCaseFolder;
		}
		return null;
	}

	static async create(userId: string, caseId: string, folderName: string): Promise<CaseFolderObj | null> {
		if (!userId || !caseId || !folderName) return null;
		const isCaseCreated = await CaseFolderDAO.add(userId, caseId, folderName);
		if (isCaseCreated) {
			return CaseFolderService.getById(caseId);
		}
		return null;
	}

	static async createLabel(userId: string, folderId: string, newLabel: string): Promise<DashboardFolderCardObj | null> {
		if (!userId || !folderId || !newLabel) return null;
		const isLabelCreated = await CaseLabelDAO.add(folderId, newLabel);
		if (isLabelCreated) {
			return await CaseFolderService.getById(folderId);
		}
		return null;
	}

	static async updateLastOpenedDate(userId: string, folderId: string, newDate: number): Promise<number | null> {
		if (!userId || !folderId || !newDate) return null;
		const updatedDate = await CaseFolderDAO.updateLastOpenedDate(userId, folderId, newDate);
		if (updatedDate !== null) {
			return updatedDate;
		}
		return null;
	}

	static async updateName(userId: string, folderId: string, newName: string): Promise<DashboardFolderCardObj | null> {
		if (!userId || !folderId || !newName) return null;
		const isNameUpdated = await CaseFolderDAO.updateName(userId, folderId, newName);
		if (isNameUpdated) {
			return await CaseFolderService.getById(folderId);
		}
		return null;
	}

	static async updateStatus(
		userId: string,
		folderId: string,
		currentStatus: boolean
	): Promise<DashboardFolderCardObj | null> {
		if (!userId || !folderId || typeof currentStatus !== "boolean") return null;
		const isStatusUpdated = await CaseFolderDAO.updateStatus(userId, folderId, currentStatus);
		if (isStatusUpdated) {
			return await CaseFolderService.getById(folderId);
		}
		return null;
	}

	static async deleteLabelById(
		userId: string,
		folderId: string,
		labelId: string
	): Promise<DashboardFolderCardObj | null> {
		if (!userId || !folderId || !labelId) return null;
		const isLabelDeleted = await CaseLabelDAO.deleteById(folderId, labelId);
		if (isLabelDeleted) {
			return await CaseFolderService.getById(folderId);
		}
		return null;
	}

	static async deleteById(userId: string, folderId: string): Promise<DashboardFolderCardObj | null> {
		if (!userId || !folderId) return null;
		const deletedCase = await CaseFolderService.getById(folderId);

		// delete files from cloud storage
		const caseFiles = await CaseFileDAO.getAllByCaseId(folderId);
		const promiseArray = [];
		for (let i = 0, n = caseFiles.length; i < n; i++) {
			promiseArray.push(await Firebase.deleteFileById(userId, folderId, caseFiles[i].id));
		}
		const cloudFilesDeleted = await Promise.all(promiseArray);
		if (cloudFilesDeleted.includes(false)) return null;

		// delete all files associated with folderid
		const filesDeleted = await CaseFileDAO.deleteAllByCaseId(folderId);
		if (!filesDeleted) return null;

		// delete all labels associated with folderid
		const labelsDeleted = await CaseLabelDAO.deleteAllByCaseId(folderId);
		if (!labelsDeleted) return null;

		// delete all clients associated with folderid
		const clientDeleted = await ClientDAO.deleteClientByFolderId(folderId);
		if (!clientDeleted) return null;

		// delete case after all associated entities have been deleted
		const isCaseDeleted = await CaseFolderDAO.deleteById(userId, folderId);
		if (isCaseDeleted) {
			return deletedCase;
		}
		return null;
	}
}