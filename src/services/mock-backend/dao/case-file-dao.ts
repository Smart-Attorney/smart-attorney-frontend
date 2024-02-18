import { CaseFileObj } from "../../../utils/types";
import { CaseFiles } from "../../mock-sql/schemas";
import { MockSqlTables } from "../../mock-sql/tables";
import { DAO } from "./dao";

export class CaseFileDAO extends DAO {
	static CASE_FILE_STORAGE_KEY = MockSqlTables.CASE_FILES;

	static async getAllCaseFilesByCaseFolderId(caseFolderId: string) {
		const caseFolderFiles: CaseFileObj[] = [];
		const caseFileArray: CaseFiles[] = await super.getArray(this.CASE_FILE_STORAGE_KEY);
		for (let i = 0; i < caseFileArray.length; i++) {
			if (caseFileArray[i].case_folder_id_fk === caseFolderId) {
				caseFolderFiles.push({
					id: caseFileArray[i].file_id,
					name: caseFileArray[i].file_name,
					createdDate: caseFileArray[i].created_date,
					lastOpenedDate: caseFileArray[i].last_opened_date,
					status: caseFileArray[i].status,
					url: caseFileArray[i].url,
				});
			}
		}
		return caseFolderFiles;
	}
}
