import { Uuid } from "../../../lib/uuid";
import { DatabaseConnection } from "../../local-database/database-connection";
import { CasesEntity } from "../../local-database/entities";
import { SqlTables } from "../../local-database/sql-tables";

export class CasesDAO {
	private CASES_KEY = SqlTables.TABLE.CASES;
	private dbConn: DatabaseConnection;
	private uuid: Uuid;

	constructor() {
		this.dbConn = new DatabaseConnection();
		this.uuid = new Uuid();
	}

	public async getAllByUserId(userUuid: string): Promise<CasesEntity[]> {
		const userCases: CasesEntity[] = [];
		const cases: CasesEntity[] = await this.dbConn.getArray(this.CASES_KEY);
		for (let i = 0, n = cases.length; i < n; i++) {
			if (cases[i].fk_user_id === userUuid) {
				userCases.push(cases[i]);
			}
		}
		return userCases;
	}

	public async get(caseUuid: string): Promise<CasesEntity | null> {
		const cases: CasesEntity[] = await this.dbConn.getArray(this.CASES_KEY);
		for (let i = 0, n = cases.length; i < n; i++) {
			if (cases[i].case_id === caseUuid) {
				return cases[i];
			}
		}
		return null;
	}

	public async save(userUuid: string, caseName: string): Promise<string | null> {
		const cases: CasesEntity[] = await this.dbConn.getArray(this.CASES_KEY);
		const currentDateUnixMilliseconds = Date.now();
		const newCase: CasesEntity = {
			case_id: this.uuid.generate(),
			case_name: caseName,
			created_date: currentDateUnixMilliseconds,
			last_opened_date: currentDateUnixMilliseconds,
			is_open: true,
			fk_user_id: userUuid,
		};
		const newCasesArr = [...cases, newCase];
		const success = await this.dbConn.setArray(this.CASES_KEY, newCasesArr);
		if (success) {
			return newCase.case_id;
		}
		return null;
	}

	public async updateLastOpenedDate(caseUuid: string, newLastOpenedDate: number): Promise<boolean | null> {
		const cases: CasesEntity[] = await this.dbConn.getArray(this.CASES_KEY);
		for (let i = 0, n = cases.length; i < n; i++) {
			if (cases[i].case_id === caseUuid) {
				cases[i].last_opened_date = newLastOpenedDate;
				break;
			}
		}
		const success = await this.dbConn.setArray(this.CASES_KEY, cases);
		if (success) {
			return true;
		}
		return false;
	}

	public async updateName(caseUuid: string, newName: string): Promise<boolean> {
		const cases: CasesEntity[] = await this.dbConn.getArray(this.CASES_KEY);
		for (let i = 0, n = cases.length; i < n; i++) {
			if (cases[i].case_id === caseUuid) {
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

	public async updateOpenState(caseUuid: string, currentState: boolean): Promise<boolean> {
		const cases: CasesEntity[] = await this.dbConn.getArray(this.CASES_KEY);
		for (let i = 0, n = cases.length; i < n; i++) {
			if (cases[i].case_id === caseUuid) {
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

	public async delete(caseUuid: string): Promise<boolean> {
		const newCasesArr: CasesEntity[] = [];
		const cases: CasesEntity[] = await this.dbConn.getArray(this.CASES_KEY);
		for (let i = 0, n = cases.length; i < n; i++) {
			if (cases[i].case_id === caseUuid) {
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
