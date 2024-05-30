import { CaseFolderObj } from "../../../utils/types";
import { CalendarDeadlines, CaseFolders } from "../../mock-sql/schemas";
import { MockSqlTables } from "../../mock-sql/tables";
import { DAO } from "../dao";

export class CaseFolderDAO extends DAO {
	private static CASE_FOLDER_STORAGE_KEY = MockSqlTables.table.CASE_FOLDERS;

	static async getAllCaseFoldersByUserId(userId: string) {
		const caseFolders: CaseFolders[] = [];
		const caseFolderArray: CaseFolders[] = await super.getArray(this.CASE_FOLDER_STORAGE_KEY);
		for (let i = 0, n = caseFolderArray.length; i < n; i++) {
			if (caseFolderArray[i].user_id_fk === userId) {
				caseFolders.push(caseFolderArray[i]);
			}
		}
		return caseFolders;
	}

	static async getCaseFolderById(folderId: string) {
		const caseFolderArray: CaseFolders[] = await super.getArray(this.CASE_FOLDER_STORAGE_KEY);
		for (let i = 0, n = caseFolderArray.length; i < n; i++) {
			if (caseFolderArray[i].folder_id === folderId) {
				const caseFolder: CaseFolderObj = {
					id: caseFolderArray[i].folder_id,
					name: caseFolderArray[i].folder_name,
					createdDate: caseFolderArray[i].created_date,
					lastOpenedDate: caseFolderArray[i].last_opened_date,
					status: caseFolderArray[i].status,
					deadline: caseFolderArray[i].deadline,
				};
				return caseFolder;
			}
		}
		return null;
	}

	static async getCaseFolderDeadlinesByUserId(userId: string) {
		const deadlines: CalendarDeadlines[] = [];
		const caseFolderArray: CaseFolders[] = await super.getArray(this.CASE_FOLDER_STORAGE_KEY);
		for (let i = 0, n = caseFolderArray.length; i < n; i++) {
			if (caseFolderArray[i].user_id_fk === userId) {
				deadlines.push({
					folder_id: caseFolderArray[i].folder_id,
					folder_name: caseFolderArray[i].folder_name,
					deadline: caseFolderArray[i].deadline,
				});
			}
		}
		return deadlines;
	}

	static async addNewCaseFolder(userId: string, folderId: string, folderName: string) {
		const caseFolderArray: CaseFolders[] = await super.getArray(this.CASE_FOLDER_STORAGE_KEY);
		const newCaseFolder: CaseFolders = {
			folder_id: folderId,
			folder_name: folderName,
			created_date: Date.now(),
			last_opened_date: Date.now(),
			status: true,
			/* 
        It's okay for a new case folder deadline to be 0 because unix time of 0 converted
        to a new Date corresponds to the date of Jan 1, 1970.
        No one is going to have a deadline set in the past so its okay, plus you can check
        if the deadline is 0 on the client-side and format the date accordingly.
      */
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

	static async updateDeadline(userId: string, folderId: string, newDeadline: number) {
		const caseFolderArray: CaseFolders[] = await super.getArray(this.CASE_FOLDER_STORAGE_KEY);
		for (let i = 0, n = caseFolderArray.length; i < n; i++) {
			if (caseFolderArray[i].user_id_fk === userId && caseFolderArray[i].folder_id === folderId) {
				caseFolderArray[i].deadline = newDeadline;
				break;
			}
		}
		const success = await super.setArray(this.CASE_FOLDER_STORAGE_KEY, caseFolderArray);
		if (success) {
			return newDeadline;
		}
		return null;
	}

	static async updateLastOpenedDate(userId: string, folderId: string, newDate: number) {
		const caseFolderArray: CaseFolders[] = await super.getArray(this.CASE_FOLDER_STORAGE_KEY);
		for (let i = 0, n = caseFolderArray.length; i < n; i++) {
			if (caseFolderArray[i].user_id_fk === userId && caseFolderArray[i].folder_id === folderId) {
				caseFolderArray[i].last_opened_date = newDate;
				break;
			}
		}
		const success = await super.setArray(this.CASE_FOLDER_STORAGE_KEY, caseFolderArray);
		if (success) {
			return newDate;
		}
		return null;
	}

	static async updateName(userId: string, folderId: string, newName: string) {
		const caseFolderArray: CaseFolders[] = await super.getArray(this.CASE_FOLDER_STORAGE_KEY);
		for (let i = 0, n = caseFolderArray.length; i < n; i++) {
			if (caseFolderArray[i].user_id_fk === userId && caseFolderArray[i].folder_id === folderId) {
				caseFolderArray[i].folder_name = newName;
				break;
			}
		}
		const success = await super.setArray(this.CASE_FOLDER_STORAGE_KEY, caseFolderArray);
		if (success) {
			return newName;
		}
		return null;
	}

	static async updateStatus(userId: string, folderId: string, currentStatus: boolean) {
		const caseFolderArray: CaseFolders[] = await super.getArray(this.CASE_FOLDER_STORAGE_KEY);
		for (let i = 0, n = caseFolderArray.length; i < n; i++) {
			if (caseFolderArray[i].user_id_fk === userId && caseFolderArray[i].folder_id === folderId) {
				caseFolderArray[i].status = !currentStatus;
				break;
			}
		}
		const success = await super.setArray(this.CASE_FOLDER_STORAGE_KEY, caseFolderArray);
		if (success) {
			return (!currentStatus).toString();
		}
		return null;
	}

	static async deleteCaseFolderById(userId: string, folderId: string) {
		const updatedArray: CaseFolders[] = [];
		const caseFolderArray: CaseFolders[] = await super.getArray(this.CASE_FOLDER_STORAGE_KEY);
		for (let i = 0, n = caseFolderArray.length; i < n; i++) {
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
