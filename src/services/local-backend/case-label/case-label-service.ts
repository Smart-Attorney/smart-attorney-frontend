import { CaseFolderLabelObj } from "../../../utils/types";
import { CaseFolderService } from "../cases/case-folder-service";
import { CaseLabelDAO } from "./case-label-dao";

export class CaseLabelService {
	private caseLabelDao: CaseLabelDAO;

	constructor() {
		this.caseLabelDao = new CaseLabelDAO();
	}

	public async getAllByUserId(userId: string): Promise<CaseFolderLabelObj[] | null> {
		if (!userId) return null;
		let userCaseLabels: CaseFolderLabelObj[] = [];
		const userCases = await CaseFolderService.getAllByUserId(userId);
		for (let i = 0, n = userCases.length; i < n; i++) {
			const caseLabels = await this.caseLabelDao.getAllByCaseId(userCases[i].id);
			userCaseLabels = [...userCaseLabels, ...caseLabels];
		}
		return userCaseLabels;
	}
}
