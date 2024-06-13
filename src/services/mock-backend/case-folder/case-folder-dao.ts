import { CaseFolderObj } from "../../../utils/types";
import { CaseFolders } from "../../mock-database/table-schemas";
import { SqlTables } from "../../mock-database/sql-tables";
import { DAO } from "../dao";

export class CaseFolderDAO extends DAO {
	private static CASE_FOLDER_STORAGE_KEY = SqlTables.TABLE.CASES;

	static async getAllByUserId(userId: string) {
		const userCases: CaseFolders[] = [];
		const cases: CaseFolders[] = await super.getArray(this.CASE_FOLDER_STORAGE_KEY);
		for (let i = 0, n = cases.length; i < n; i++) {
			if (cases[i].user_id_fk === userId) {
				userCases.push(cases[i]);
			}
		}
		return userCases;
	}

	static async getById(caseId: string) {
		const cases: CaseFolders[] = await super.getArray(this.CASE_FOLDER_STORAGE_KEY);
		for (let i = 0, n = cases.length; i < n; i++) {
			if (cases[i].folder_id === caseId) {
				const caseFolder: CaseFolderObj = {
					id: cases[i].folder_id,
					name: cases[i].folder_name,
					createdDate: cases[i].created_date,
					lastOpenedDate: cases[i].last_opened_date,
					status: cases[i].status,
				};
				return caseFolder;
			}
		}
		return null;
	}

	static async add(userId: string, caseId: string, caseName: string) {
		const cases: CaseFolders[] = await super.getArray(this.CASE_FOLDER_STORAGE_KEY);
		const newCase: CaseFolders = {
			folder_id: caseId,
			folder_name: caseName,
			created_date: Date.now(),
			last_opened_date: Date.now(),
			status: true,
			user_id_fk: userId,
		};
		const updatedArray = [...cases, newCase];
		const success = await super.setArray(this.CASE_FOLDER_STORAGE_KEY, updatedArray);
		if (success) {
			return newCase;
		}
		return null;
	}

	static async updateLastOpenedDate(userId: string, caseId: string, newDate: number) {
		const caseFolderArray: CaseFolders[] = await super.getArray(this.CASE_FOLDER_STORAGE_KEY);
		for (let i = 0, n = caseFolderArray.length; i < n; i++) {
			if (caseFolderArray[i].user_id_fk === userId && caseFolderArray[i].folder_id === caseId) {
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

	static async updateName(userId: string, caseId: string, newName: string): Promise<boolean> {
		const caseFolderArray: CaseFolders[] = await super.getArray(this.CASE_FOLDER_STORAGE_KEY);
		for (let i = 0, n = caseFolderArray.length; i < n; i++) {
			if (caseFolderArray[i].user_id_fk === userId && caseFolderArray[i].folder_id === caseId) {
				caseFolderArray[i].folder_name = newName;
				break;
			}
		}
		const success = await super.setArray(this.CASE_FOLDER_STORAGE_KEY, caseFolderArray);
		if (success) {
			return true;
		}
		return false;
	}

	static async updateStatus(userId: string, caseId: string, currentStatus: boolean): Promise<boolean> {
		const caseFolderArray: CaseFolders[] = await super.getArray(this.CASE_FOLDER_STORAGE_KEY);
		for (let i = 0, n = caseFolderArray.length; i < n; i++) {
			if (caseFolderArray[i].user_id_fk === userId && caseFolderArray[i].folder_id === caseId) {
				caseFolderArray[i].status = !currentStatus;
				break;
			}
		}
		const success = await super.setArray(this.CASE_FOLDER_STORAGE_KEY, caseFolderArray);
		if (success) {
			return true;
		}
		return false;
	}

	static async deleteById(userId: string, caseId: string): Promise<boolean> {
		const updatedArray: CaseFolders[] = [];
		const caseFolderArray: CaseFolders[] = await super.getArray(this.CASE_FOLDER_STORAGE_KEY);
		for (let i = 0, n = caseFolderArray.length; i < n; i++) {
			if (caseFolderArray[i].user_id_fk === userId && caseFolderArray[i].folder_id === caseId) {
				continue;
			}
			updatedArray.push(caseFolderArray[i]);
		}
		const success = await super.setArray(this.CASE_FOLDER_STORAGE_KEY, updatedArray);
		if (success) {
			return true;
		}
		return false;
	}
}
