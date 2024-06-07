import { DocumentUtils } from "../../../utils/document-utils";
import { DashboardFolderCardObj } from "../../../utils/types";
import { Firebase } from "../../cloud-storage/firebase";
import { ClientDAO } from "../case-client/client-dao";
import { CaseFileDAO } from "../case-file/case-file-dao";
import { FolderLabelDAO } from "../case-folder-label/folder-label-dao";
import { CaseFolderDAO } from "./case-folder-dao";

export class CaseFolderService {
	static async getAllCaseFoldersByUserId(userId: string) {
		let userCaseFolders: DashboardFolderCardObj[] = [];
		const caseFolders = await CaseFolderDAO.getAllCaseFoldersByUserId(userId);
		for (let i = 0, n = caseFolders.length; i < n; i++) {
			const folderId = caseFolders[i].folder_id;
			const labels = await FolderLabelDAO.getAllLabelsByCaseFolderId(folderId);
			const documents = await CaseFileDAO.getAllFilesByCaseFolderId(folderId);
			const urgentDeadline = await DocumentUtils.getUrgentDeadline(documents);
			userCaseFolders.push({
				id: caseFolders[i].folder_id,
				name: caseFolders[i].folder_name,
				createdDate: caseFolders[i].created_date,
				lastOpenedDate: caseFolders[i].last_opened_date,
				status: caseFolders[i].status,
				urgentDocumentDeadline: urgentDeadline,
				labels: labels,
				files: documents,
			});
		}
		return userCaseFolders;
	}

	static async getCaseFolderById(folderId: string) {
		if (!folderId) {
			return null;
		}
		const retrievedCaseFolder = await CaseFolderDAO.getCaseFolderById(folderId);
		if (retrievedCaseFolder !== null) {
			return retrievedCaseFolder;
		}
		return null;
	}

	static async createCaseFolder(userId: string, folderId: string, folderName: string) {
		const newFolder = await CaseFolderDAO.addNewCaseFolder(userId, folderId, folderName);
		if (newFolder !== null) {
			return newFolder;
		}
		return null;
	}

	static async updateLastOpenedDate(userId: string, folderId: string, newDate: number) {
		if (!userId || !folderId || !newDate) {
			return null;
		}
		const updatedDate = await CaseFolderDAO.updateLastOpenedDate(userId, folderId, newDate);
		if (updatedDate !== null) {
			return updatedDate;
		}
		return null;
	}

	static async updateName(userId: string, folderId: string, newName: string) {
		if (!userId || !folderId || !newName) {
			return null;
		}
		const updatedName = await CaseFolderDAO.updateName(userId, folderId, newName);
		if (updatedName !== null) {
			return updatedName;
		}
		return null;
	}

	static async updateStatus(userId: string, folderId: string, currentStatus: boolean) {
		if (!userId || !folderId || typeof currentStatus !== "boolean") {
			return null;
		}
		const updatedStatus = await CaseFolderDAO.updateStatus(userId, folderId, currentStatus);
		if (updatedStatus !== null) {
			return updatedStatus;
		}
		return null;
	}

	static async deleteCaseFolder(userId: string, folderId: string) {
		if (!userId || !folderId) {
			return null;
		}
		// delete files from cloud storage
		const caseFiles = await CaseFileDAO.getAllFilesByCaseFolderId(folderId);
		const promiseArray = [];
		for (let i = 0, n = caseFiles.length; i < n; i++) {
			promiseArray.push(await Firebase.deleteFileById(userId, folderId, caseFiles[i].id));
		}
		const cloudFilesDeleted = await Promise.all(promiseArray);
		if (cloudFilesDeleted.includes(false)) {
			return null;
		}
		// delete all files associated with folderid
		const filesDeleted = await CaseFileDAO.deleteAllFilesByFolderId(folderId);
		if (!filesDeleted) {
			return null;
		}
		// delete all labels associated with folderid
		const labelsDeleted = await FolderLabelDAO.deleteAllLabelsByFolderId(folderId);
		if (!labelsDeleted) {
			return null;
		}
		// delete all clients associated with folderid
		const clientDeleted = await ClientDAO.deleteClientByFolderId(folderId);
		if (!clientDeleted) {
			return null;
		}
		const deletedCaseFolder = await CaseFolderDAO.deleteCaseFolderById(userId, folderId);
		if (deletedCaseFolder !== null) {
			return deletedCaseFolder;
		}
		return null;
	}
}
