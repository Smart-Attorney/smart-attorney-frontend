import { nanoid } from "../../../lib/nanoid";
import { CaseFolderObj } from "../../../utils/types";
import { CaseFolders } from "../../mock-sql/schemas";
import { MockSqlTables } from "../../mock-sql/tables";
import { CaseFileDAO } from "./case-file-dao";
import { ClientDAO } from "./client-dao";
import { DAO } from "./dao";
import { FolderLabelDAO } from "./folder-label-dao";

export class CaseFolderDAO extends DAO {
	private static CASE_FOLDER_STORAGE_KEY = MockSqlTables.CASE_FOLDERS;

	static async getAllCaseFoldersByUserId(userId: string) {
		const userCaseFolders: CaseFolderObj[] = [];
		const caseFolderArray: CaseFolders[] = await super.getArray(this.CASE_FOLDER_STORAGE_KEY);
		for (let i = 0; i < caseFolderArray.length; i++) {
			if (caseFolderArray[i].user_id_fk === userId) {
				const caseFolderId = caseFolderArray[i].folder_id;
				const labels = await FolderLabelDAO.getAllLabelsByCaseFolderId(caseFolderId);
				const files = await CaseFileDAO.getAllFilesByCaseFolderId(caseFolderId);
				const client = await ClientDAO.getClientByCaseFolderId(caseFolderId);
				userCaseFolders.push({
					id: caseFolderArray[i].folder_id,
					name: caseFolderArray[i].folder_name,
					createdDate: caseFolderArray[i].created_date,
					lastOpenedDate: caseFolderArray[i].last_opened_date,
					status: caseFolderArray[i].status,
					deadline: caseFolderArray[i].deadline,
					labels: labels,
					files: files,
					client: client,
				});
			}
		}
		return userCaseFolders;
	}

	static async getCaseFolderById(folderId: string) {
		const caseFolderArray: CaseFolders[] = await super.getArray(this.CASE_FOLDER_STORAGE_KEY);
		for (let i = 0; i < caseFolderArray.length; i++) {
			if (caseFolderArray[i].folder_id === folderId) {
				const labels = await FolderLabelDAO.getAllLabelsByCaseFolderId(folderId);
				const files = await CaseFileDAO.getAllFilesByCaseFolderId(folderId);
				const client = await ClientDAO.getClientByCaseFolderId(folderId);
				const caseFolder: CaseFolderObj = {
					id: caseFolderArray[i].folder_id,
					name: caseFolderArray[i].folder_name,
					createdDate: caseFolderArray[i].created_date,
					lastOpenedDate: caseFolderArray[i].last_opened_date,
					status: caseFolderArray[i].status,
					deadline: caseFolderArray[i].deadline,
					labels: labels,
					files: files,
					client: client,
				};
				return caseFolder;
			}
		}
		return null;
	}

	static async addNewCaseFolder(userId: string, name: string) {
		const caseFolderArray: CaseFolders[] = await super.getArray(this.CASE_FOLDER_STORAGE_KEY);
		const newCaseFolder: CaseFolders = {
			folder_id: nanoid(8),
			folder_name: name,
			created_date: Date.now(),
			last_opened_date: Date.now(),
			status: "#53EF0A",
			deadline: 0,
			user_id_fk: userId,
		};
		const updatedArray = [...caseFolderArray, newCaseFolder];
		const success = await super.setArray(this.CASE_FOLDER_STORAGE_KEY, updatedArray);
		if (success) {
			return newCaseFolder;
		}
		return null;
	}

	static async updateCaseFolderDeadline(folderId: string, deadline: number) {
		const caseFolderArray: CaseFolders[] = await super.getArray(this.CASE_FOLDER_STORAGE_KEY);
		for (let i = 0; i < caseFolderArray.length; i++) {
			if (caseFolderArray[i].folder_id === folderId) {
				caseFolderArray[i].deadline = deadline;
				break;
			}
		}
		const success = await super.setArray(this.CASE_FOLDER_STORAGE_KEY, caseFolderArray);
		if (success) {
			return deadline;
		}
		return null;
	}

	static async deleteCaseFolderById(userId: string, folderId: string) {
		const updatedArray: CaseFolders[] = [];
		const caseFolderArray: CaseFolders[] = await super.getArray(this.CASE_FOLDER_STORAGE_KEY);
		for (let i = 0; i < caseFolderArray.length; i++) {
			if (caseFolderArray[i].user_id_fk === userId && caseFolderArray[i].folder_id === folderId) {
				continue;
			}
			updatedArray.push(caseFolderArray[i]);
		}
		const success = await super.setArray(this.CASE_FOLDER_STORAGE_KEY, updatedArray);
		if (success) {
			return folderId;
		}
		return null;
	}
}
