import { CaseLabel } from "../../../types/api";
import { CasesDAO } from "../cases/cases-dao";
import { CaseLabelDAO } from "./case-label-dao";

export class CaseLabelService {
	private caseLabelDao: CaseLabelDAO;
	private casesDao: CasesDAO;

	constructor() {
		this.caseLabelDao = new CaseLabelDAO();
		this.casesDao = new CasesDAO();
	}

	public async getAllCaseLabelsByUserId(userId: string): Promise<CaseLabel[] | null> {
		if (!userId) return null;
		let userCaseLabels: CaseLabel[] = [];
		const userCases = await this.casesDao.getAllByUserId(userId);
		for (let i = 0, n = userCases.length; i < n; i++) {
			const labels = await this.caseLabelDao.getAllByCaseId(userCases[i].case_id);
			const caseLabels: CaseLabel[] = labels.map((label) => ({
				id: label.label_id,
				name: label.label_name,
			}));
			userCaseLabels = [...userCaseLabels, ...caseLabels];
		}
		return userCaseLabels;
	}

	public async getCaseLabel(labelId: string): Promise<CaseLabel | null> {
		if (!labelId) return null;
		const label = await this.caseLabelDao.get(labelId);
		if (label !== null) {
			const caseLabel: CaseLabel = {
				id: label.label_id,
				name: label.label_name,
			};
			return caseLabel;
		}
		return null;
	}

	public async addCaseLabel(userId: string, caseId: string, labelName: string): Promise<CaseLabel | null> {
		if (!userId || !caseId || !labelName) return null;
		const newLabelId = await this.caseLabelDao.save(caseId, labelName);
		if (newLabelId !== null) {
			return this.getCaseLabel(newLabelId);
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
