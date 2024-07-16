import { CaseLabelObj } from "../../../types/api";
import { CaseLabelEntity } from "../../local-database/entities";
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

	public async addCaseLabel(userId: string, caseId: string, labelName: string): Promise<CaseLabelEntity | null> {
		if (!userId || !caseId || !labelName) return null;
		const newLabel = await this.caseLabelDao.save(caseId, labelName);
		if (newLabel !== null) {
			return newLabel;
		}
		return null;
	}

	public async deleteCaseLabel(userId: string, caseId: string, labelId: string) {
		if (!userId || !caseId || !labelId) return null;
		const deletedLabel = this.caseLabelDao.get(labelId);
		const isLabelDeleted = await this.caseLabelDao.delete(caseId, labelId);
		if (isLabelDeleted) {
			return deletedLabel;
		}
		return null;
	}
}
