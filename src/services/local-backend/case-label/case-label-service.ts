import { CaseLabelObj } from "../../../types/api";
import { CasesDAO } from "../cases/cases-dao";
import { CaseLabelDAO } from "./case-label-dao";

export class CaseLabelService {
	private caseLabelDao: CaseLabelDAO;
	private casesDao: CasesDAO;

	constructor() {
		this.caseLabelDao = new CaseLabelDAO();
		this.casesDao = new CasesDAO();
	}

	public async getAllLabelsByUserId(userId: string): Promise<CaseLabelObj[] | null> {
		if (!userId) return null;
		let userCaseLabels: CaseLabelObj[] = [];
		const userCases = await this.casesDao.getAllByUserId(userId);
		for (let i = 0, n = userCases.length; i < n; i++) {
			const caseLabels = await this.caseLabelDao.getAllByCaseId(userCases[i].case_id);
			userCaseLabels = [...userCaseLabels, ...caseLabels];
		}
		return userCaseLabels;
	}
}
