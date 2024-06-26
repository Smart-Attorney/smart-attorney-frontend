import { CaseFolderObj } from "../../../utils/types";
import { DatabaseConnection } from "../../local-database/database-connection";
import { CasesEntity } from "../../local-database/entities";
import { SqlTables } from "../../local-database/sql-tables";

export class CasesDAO {
	private CASES_KEY = SqlTables.TABLE.CASES;
	private dbConn: DatabaseConnection;

	constructor() {
		this.dbConn = new DatabaseConnection();
	}

	public async getAllByUserId(userId: string): Promise<CasesEntity[]> {
		const userCases: CasesEntity[] = [];
		const cases: CasesEntity[] = await this.dbConn.getArray(this.CASES_KEY);
		for (let i = 0, n = cases.length; i < n; i++) {
			if (cases[i].fk_user_id === userId) {
				userCases.push(cases[i]);
			}
		}
		return userCases;
	}

	public async getById(caseId: string): Promise<CaseFolderObj | null> {
		const cases: CasesEntity[] = await this.dbConn.getArray(this.CASES_KEY);
		for (let i = 0, n = cases.length; i < n; i++) {
			if (cases[i].case_id === caseId) {
				const caseFolder: CaseFolderObj = {
					id: cases[i].case_id,
					name: cases[i].case_name,
					createdDate: cases[i].created_date,
					lastOpenedDate: cases[i].last_opened_date,
					isOpen: cases[i].is_open,
				};
				return caseFolder;
			}
		}
		return null;
	}

	public async add(userId: string, caseId: string, caseName: string): Promise<CasesEntity | null> {
		const cases: CasesEntity[] = await this.dbConn.getArray(this.CASES_KEY);
		const newCase: CasesEntity = {
			case_id: caseId,
			case_name: caseName,
			created_date: Date.now(),
			last_opened_date: Date.now(),
			is_open: true,
			fk_user_id: userId,
		};
		const newCasesArr = [...cases, newCase];
		const success = await this.dbConn.setArray(this.CASES_KEY, newCasesArr);
		if (success) {
			return newCase;
		}
		return null;
	}

	public async updateLastOpenedDate(userId: string, caseId: string, newDate: number): Promise<number | null> {
		const cases: CasesEntity[] = await this.dbConn.getArray(this.CASES_KEY);
		for (let i = 0, n = cases.length; i < n; i++) {
			if (cases[i].fk_user_id === userId && cases[i].case_id === caseId) {
				cases[i].last_opened_date = newDate;
				break;
			}
		}
		const success = await this.dbConn.setArray(this.CASES_KEY, cases);
		if (success) {
			return newDate;
		}
		return null;
	}

	public async updateName(userId: string, caseId: string, newName: string): Promise<boolean> {
		const cases: CasesEntity[] = await this.dbConn.getArray(this.CASES_KEY);
		for (let i = 0, n = cases.length; i < n; i++) {
			if (cases[i].fk_user_id === userId && cases[i].case_id === caseId) {
				cases[i].case_name = newName;
				break;
			}
		}
		const success = await this.dbConn.setArray(this.CASES_KEY, cases);
		if (success) {
			return true;
		}
		return false;
	}

	public async updateOpenState(userId: string, caseId: string, currentState: boolean): Promise<boolean> {
		const cases: CasesEntity[] = await this.dbConn.getArray(this.CASES_KEY);
		for (let i = 0, n = cases.length; i < n; i++) {
			if (cases[i].fk_user_id === userId && cases[i].case_id === caseId) {
				cases[i].is_open = !currentState;
				break;
			}
		}
		const success = await this.dbConn.setArray(this.CASES_KEY, cases);
		if (success) {
			return true;
		}
		return false;
	}

	public async deleteById(userId: string, caseId: string): Promise<boolean> {
		const newCasesArr: CasesEntity[] = [];
		const cases: CasesEntity[] = await this.dbConn.getArray(this.CASES_KEY);
		for (let i = 0, n = cases.length; i < n; i++) {
			if (cases[i].fk_user_id === userId && cases[i].case_id === caseId) {
				continue;
			}
			newCasesArr.push(cases[i]);
		}
		const success = await this.dbConn.setArray(this.CASES_KEY, newCasesArr);
		if (success) {
			return true;
		}
		return false;
	}
}
