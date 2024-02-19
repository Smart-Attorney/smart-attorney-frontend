import { CreateCaseFolderDTO } from "../../../features/create-case-folder/api/create-case-folder";
import { Firebase } from "../../cloud-storage/firebase";
import { CaseFiles } from "../../mock-sql/schemas";
import { CaseFileDAO } from "../dao/case-file-dao";
import { CaseFolderDAO } from "../dao/case-folder-dao";
import { ClientDAO } from "../dao/client-dao";

export class CaseFolderService {
	static async getAllCaseFolders(userId: string) {
		const userCaseFolders = await CaseFolderDAO.getAllCaseFoldersByUserId(userId);
		if (userCaseFolders.length === 0) {
			return null;
		}
		return userCaseFolders;
	}

	static async createCaseFolder(userId: string, folderObj: CreateCaseFolderDTO) {
		const { name, client, files } = folderObj;
		const { firstName, lastName, dateOfBirth, sex, countryOfCitizenship, primaryLanguage } = client;
		const newFolder = await CaseFolderDAO.addNewCaseFolder(name, userId);
		if (!newFolder) {
			return false;
		}
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
		const newCaseFiles: CaseFiles[] = [];
		for (let i = 0; i < files.length; i++) {
			try {
				const fileUrl = await Firebase.uploadFile(userId, newFolder.folder_id, files[i].id, files[i].data);
				if (!fileUrl) continue;
				const newFile = await CaseFileDAO.addNewCaseFile(files[i].id, files[i].data.name, fileUrl, newFolder.folder_id);
				if (!newFile) continue;
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
}
