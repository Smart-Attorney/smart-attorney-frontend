import { CreateCaseFolderDTO } from "../../../features/create-case-folder/api/create-case-folder";
import { UpdateDeadlineDTO } from "../../../features/dashboard/api/update-deadline";
import { Firebase } from "../../cloud-storage/firebase";
import { CaseFiles } from "../../mock-sql/schemas";
import { CaseFileDAO } from "../dao/case-file-dao";
import { CaseFolderDAO } from "../dao/case-folder-dao";
import { ClientDAO } from "../dao/client-dao";
import { FolderLabelDAO } from "../dao/folder-label-dao";

export class CaseFolderService {
	static async getAllUserCaseFoldersById(userId: string) {
		const userCaseFolders = await CaseFolderDAO.getAllCaseFoldersByUserId(userId);
		if (userCaseFolders.length === 0) {
			return null;
		}
		return userCaseFolders;
	}

	static async createCaseFolder(userId: string, folderObj: CreateCaseFolderDTO) {
		const { name, client, files } = folderObj;
		const { firstName, lastName, dateOfBirth, sex, countryOfCitizenship, primaryLanguage } = client;
		// create new folder to get folder id
		const newFolder = await CaseFolderDAO.addNewCaseFolder(userId, name);
		if (!newFolder) {
			return false;
		}
		// create new client thats tied to folder id
		const newClient = await ClientDAO.addNewClient(
			firstName,
			lastName,
			dateOfBirth,
			sex,
			countryOfCitizenship,
			primaryLanguage,
			newFolder.folder_id
		);
		if (!newClient) {
			return false;
		}
		// add files that are tied to folder id
		const newCaseFiles: CaseFiles[] = [];
		for (let i = 0; i < files.length; i++) {
			try {
				const fileUrl = await Firebase.uploadFile(userId, newFolder.folder_id, files[i].id, files[i].data);
				if (!fileUrl) {
					continue;
				}
				const newFile = await CaseFileDAO.addNewCaseFile(files[i].id, files[i].data.name, fileUrl, newFolder.folder_id);
				if (!newFile) {
					continue;
				}
				newCaseFiles.push(newFile);
			} catch (error) {
				console.log(error);
			}
		}
		if (newFolder && newClient && newCaseFiles) {
			return true;
		} else {
			return false;
		}
	}

	static async updateCaseFolderDeadline(folderId: string, deadline: UpdateDeadlineDTO) {
		if (!folderId || !deadline) {
			return null;
		}
		const updatedDeadline = await CaseFolderDAO.updateCaseFolderDeadline(folderId, deadline);
		if (updatedDeadline !== null) {
			return deadline;
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
		for (let i = 0; i < caseFiles.length; i++) {
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
