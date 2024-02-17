import CaseFolderService from "../service/case-folder-service";

class CaseFolderController {
	static async getAllCaseFolders(request: Request) {
		const urlArray = request.url.split("/");
    const userId = urlArray[urlArray.length - 1];
    
    const userCaseFolders = await CaseFolderService.getAllCaseFolders(userId);
    return userCaseFolders;
	}
}

export default CaseFolderController;
