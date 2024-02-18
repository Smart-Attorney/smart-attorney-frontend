import { CaseFolderDAO } from "../dao/case-folder-dao";

export class CaseFolderService {
	static async getAllCaseFolders(userId: string) {
		const userCaseFolders = await CaseFolderDAO.getAllCaseFoldersByUserId(userId);
		if (userCaseFolders.length === 0) {
			return null;
		}
		return userCaseFolders;
	}
}
