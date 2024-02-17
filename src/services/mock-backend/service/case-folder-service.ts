
import CaseFolderDAO from "../dao/case-folder-dao";

class CaseFolderService {
	static async getAllCaseFolders(userId: string) {
    const userCaseFolders = await CaseFolderDAO.getAllCaseFoldersByUserId(userId);
    return userCaseFolders;
	}
}

export default CaseFolderService;
