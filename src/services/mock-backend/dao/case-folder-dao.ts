import { CaseFolders } from "../../mock-sql/models";
import DAO from "./dao";

class CaseFolderDAO extends DAO {
	static CASE_FOLDER_STORAGE_KEY = "case_folders";

	static async getAllCaseFoldersByUserId(userId: string) {
		const userCaseFoldersArray: CaseFolders[] = [];
		const caseFolderArray: CaseFolders[] = await super.getArray(this.CASE_FOLDER_STORAGE_KEY);
		for (let i = 0; i < caseFolderArray.length; i++) {
			if (caseFolderArray[i].user_id_fk === userId) {
				userCaseFoldersArray.push(caseFolderArray[i]);
			}
		}
		return userCaseFoldersArray;
	}
}

export default CaseFolderDAO;
