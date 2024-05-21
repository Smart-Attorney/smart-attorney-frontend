import { CaseFileObj, FileStatus } from "../../../utils/types";
import { Firebase } from "../../cloud-storage/firebase";
import { CaseFileDAO } from "../dao/case-file-dao";

export class CaseFileService {
	static async createCaseFiles(userId: string, folderId: string, files: File[]) {
		if (!folderId || !files) {
			return null;
		}
		const fileArray: CaseFileObj[] = [];
		for (let i = 0; i < files.length; i++) {
			const { name } = files[i];
			const fileId = name.split("/")[0];
			const fileName = name.split("/")[1];
			const fileUrl = await Firebase.uploadFile(userId, folderId, fileId, files[i]);
			if (fileUrl !== null) {
				const newCaseFile = await CaseFileDAO.addNewCaseFile(fileId, fileName, fileUrl, folderId);
				if (newCaseFile !== null) {
					fileArray.push({
						id: newCaseFile.file_id,
						name: newCaseFile.file_name,
						createdDate: newCaseFile.created_date,
						lastOpenedDate: newCaseFile.last_opened_date,
						status: newCaseFile.status,
						deadline: newCaseFile.deadline,
						url: newCaseFile.url,
					});
				}
			}
		}
		return fileArray;
	}

	static async getCaseFilesByFolderId(folderId: string) {
		if (!folderId) {
			return null;
		}
		const retrievedCaseFiles = await CaseFileDAO.getAllFilesByCaseFolderId(folderId);
		if (retrievedCaseFiles !== null) {
			return retrievedCaseFiles;
		}
		return null;
	}

	static async getCaseFileByIdFromDB(userId: string, folderId: string, fileId: string) {
		if (!userId || !folderId || !fileId) {
			return null;
		}
		const retrievedCaseFile = await CaseFileDAO.getCaseFileById(folderId, fileId);
		if (retrievedCaseFile !== null) {
			return retrievedCaseFile;
		}
		return null;
	}

	static async updateFileStatus(folderId: string, fileId: string, newStatus: FileStatus) {
		if (!folderId || !fileId || !newStatus) {
			return null;
		}
		const updatedFileStatus = await CaseFileDAO.updateFileStatus(folderId, fileId, newStatus);
		if (updatedFileStatus !== null) {
			return newStatus;
		}
		return null;
	}

	static async updateFileName(folderId: string, fileId: string, newName: string) {
		if (!folderId || !fileId || !newName) {
			return null;
		}
		const updatedFileName = await CaseFileDAO.updateFileName(folderId, fileId, newName);
		if (updatedFileName !== null) {
			return newName;
		}
		return null;
	}

	static async updateFileDeadline(folderId: string, fileId: string, newDeadline: number) {
		if (!folderId || !fileId || !newDeadline) {
			return null;
		}
		const updatedFileDeadline = await CaseFileDAO.updateFileDeadline(folderId, fileId, newDeadline);
		if (updatedFileDeadline !== null) {
			return newDeadline;
		}
		return null;
	}

	static async deleteCaseFileById(userId: string, folderId: string, fileId: string) {
		if (!userId || !folderId || !fileId) {
			return false;
		}
		const fileRemovedFromCloud = await Firebase.deleteFileById(userId, folderId, fileId);
		if (!fileRemovedFromCloud) {
			return false;
		}
		const deletedFile = await CaseFileDAO.deleteFileById(folderId, fileId);
		if (deletedFile) {
			return true;
		}
		return false;
	}
}
