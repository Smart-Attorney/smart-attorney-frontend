import { CaseFileObj, DocumentStatus } from "../../../utils/types";
import { Firebase } from "../../cloud-storage/firebase";
import { CaseFileDAO } from "./case-file-dao";
import { CasesService } from "../cases/cases-service";

export class CaseFileService {
	static async create(userId: string, folderId: string, files: File[]): Promise<CaseFileObj[] | null> {
		if (!folderId || !files) return null;
		const documents: CaseFileObj[] = [];
		for (let i = 0, n = files.length; i < n; i++) {
			const { name } = files[i];
			const fileId = name.split("/")[0];
			const fileName = name.split("/")[1];
			const fileUrl = await Firebase.uploadFile(userId, folderId, fileId, files[i]);
			if (fileUrl === null) return null;
			const newDocument = await CaseFileDAO.add(fileId, fileName, fileUrl, folderId);
			if (newDocument === null) return null;
			documents.push({
				id: newDocument.file_id,
				name: newDocument.file_name,
				createdDate: newDocument.created_date,
				lastOpenedDate: newDocument.last_opened_date,
				status: newDocument.status,
				deadline: newDocument.deadline,
				url: newDocument.url,
			});
		}
		return documents;
	}

	static async getAllByCaseId(caseId: string): Promise<CaseFileObj[] | null> {
		if (!caseId) return null;
		const retrievedDocuments = await CaseFileDAO.getAllByCaseId(caseId);
		return retrievedDocuments;
	}

	static async getById(userId: string, folderId: string, fileId: string): Promise<CaseFileObj | null> {
		if (!userId || !folderId || !fileId) return null;
		const retrievedDocument = await CaseFileDAO.getById(folderId, fileId);
		if (retrievedDocument !== null) {
			return retrievedDocument;
		}
		return null;
	}

	static async getAllByUserId(userId: string): Promise<CaseFileObj[] | null> {
		if (!userId) return null;
		const documents: CaseFileObj[] = [];
		const userCases = await CasesService.getAllByUserId(userId);
		for (let i = 0, n = userCases.length; i < n; i++) {
			if (userCases[i].files.length === 0) continue;
			userCases[i].files.forEach((document) => {
				documents.push(document);
			});
		}
		return documents;
	}

	static async updateStatus(folderId: string, fileId: string, newStatus: DocumentStatus): Promise<CaseFileObj | null> {
		if (!folderId || !fileId || !newStatus) return null;
		const isUpdated = await CaseFileDAO.updateStatus(folderId, fileId, newStatus);
		if (isUpdated) {
			return CaseFileDAO.getById(folderId, fileId);
		}
		return null;
	}

	static async updateName(folderId: string, fileId: string, newName: string): Promise<CaseFileObj | null> {
		if (!folderId || !fileId || !newName) return null;
		const isUpdated = await CaseFileDAO.updateName(folderId, fileId, newName);
		if (isUpdated) {
			return CaseFileDAO.getById(folderId, fileId);
		}
		return null;
	}

	static async updateDeadline(folderId: string, fileId: string, newDeadline: number): Promise<CaseFileObj | null> {
		if (!folderId || !fileId || !newDeadline) return null;
		const isUpdated = await CaseFileDAO.updateDeadline(folderId, fileId, newDeadline);
		if (isUpdated) {
			return CaseFileDAO.getById(folderId, fileId);
		}
		return null;
	}

	static async deleteById(userId: string, caseId: string, fileId: string): Promise<CaseFileObj | null> {
		if (!userId || !caseId || !fileId) return null;
		const isFileDeletedFromCloud = await Firebase.deleteFileById(userId, caseId, fileId);
		if (!isFileDeletedFromCloud) return null;
		const deletedDocument = CaseFileDAO.getById(caseId, fileId);
		const isDeleted = await CaseFileDAO.deleteById(caseId, fileId);
		if (isDeleted) {
			return deletedDocument;
		}
		return null;
	}
}
