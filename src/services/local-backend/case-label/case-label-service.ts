import { CaseLabelObj } from "../../../utils/types";
import { CasesService } from "../cases/cases-service";
import { CaseLabelDAO } from "./case-label-dao";

export class CaseLabelService {
	private caseLabelDao: CaseLabelDAO;
	private casesService: CasesService;

	constructor() {
		this.caseLabelDao = new CaseLabelDAO();
		this.casesService = new CasesService();
	}

	public async getAllByUserId(userId: string): Promise<CaseLabelObj[] | null> {
		if (!userId) return null;
		let userCaseLabels: CaseLabelObj[] = [];
		const userCases = await this.casesService.getAllByUserId(userId);
		for (let i = 0, n = userCases.length; i < n; i++) {
			const caseLabels = await this.caseLabelDao.getAllByCaseId(userCases[i].id);
			userCaseLabels = [...userCaseLabels, ...caseLabels];
		}
		return userCaseLabels;
	}
}
