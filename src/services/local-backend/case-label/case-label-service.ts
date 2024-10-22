import { ShortUuid } from "../../../lib/short-uuid";
import { Uuid } from "../../../lib/uuid";
import { CaseLabel } from "../../../types/api";
import { CasesDAO } from "../cases/cases-dao";
import { CaseLabelDAO } from "./case-label-dao";

export class CaseLabelService {
	private caseLabelDao: CaseLabelDAO;
	private casesDao: CasesDAO;
	private shortUuid: ShortUuid;
	private uuid: Uuid;

	constructor() {
		this.caseLabelDao = new CaseLabelDAO();
		this.casesDao = new CasesDAO();
		this.shortUuid = new ShortUuid();
		this.uuid = new Uuid();
	}

	public async getAllCaseLabelsByUserId(userShortId: string): Promise<CaseLabel[] | null> {
		if (!userShortId) return null;
		const userUuid = this.shortUuid.toUUID(userShortId);
		if (!this.uuid.isValid(userUuid)) return null;
		let userCaseLabels: CaseLabel[] = [];
		const userCases = await this.casesDao.getAllByUserId(userUuid);
		for (let i = 0, n = userCases.length; i < n; i++) {
			const labels = await this.caseLabelDao.getAllByCaseId(userCases[i].case_id);
			const caseLabels: CaseLabel[] = labels.map((label) => ({
				id: this.shortUuid.toShort(label.label_id),
				name: label.label_name,
			}));
			userCaseLabels = [...userCaseLabels, ...caseLabels];
		}
		return userCaseLabels;
	}

	public async getAllCaseLabelsByCaseId(caseShortId: string): Promise<CaseLabel[] | null> {
		if (!caseShortId) return null;
		const caseUuid = this.shortUuid.toUUID(caseShortId);
		if (!this.uuid.isValid(caseUuid)) return null;
		const caseLabels = await this.caseLabelDao.getAllByCaseId(caseUuid);
		const retrievedCaseLabels: CaseLabel[] = caseLabels.map((label) => ({
			id: this.shortUuid.toShort(label.label_id),
			name: label.label_name,
		}));
		return retrievedCaseLabels;
	}

	public async getCaseLabel(labelShortId: string): Promise<CaseLabel | null> {
		if (!labelShortId) return null;
		const labelUuid = this.shortUuid.toUUID(labelShortId);
		if (!this.uuid.isValid(labelUuid)) return null;
		const label = await this.caseLabelDao.get(labelUuid);
		if (label !== null) {
			const caseLabel: CaseLabel = {
				id: this.shortUuid.toShort(label.label_id),
				name: label.label_name,
			};
			return caseLabel;
		}
		return null;
	}

	public async addCaseLabel(caseShortId: string, labelName: string): Promise<CaseLabel | null> {
		if (!caseShortId || !labelName) return null;
		const caseUuid = this.shortUuid.toUUID(caseShortId);
		if (!this.uuid.isValid(caseUuid)) return null;
		const newLabelUuid = await this.caseLabelDao.save(caseUuid, labelName);
		if (newLabelUuid !== null) {
			const newLabelShortId = this.shortUuid.toShort(newLabelUuid);
			return this.getCaseLabel(newLabelShortId);
		}
		return null;
	}

	public async deleteAllCaseLabelsByCaseId(caseShortId: string): Promise<CaseLabel[] | null> {
		if (!caseShortId) return null;
		const caseUuid = this.shortUuid.toUUID(caseShortId);
		if (!this.uuid.isValid(caseUuid)) return null;
		const deletedCaseLabels = await this.getAllCaseLabelsByCaseId(caseShortId);
		const areCaseLabelsDeleted = await this.caseLabelDao.deleteAllByCaseId(caseUuid);
		if (areCaseLabelsDeleted) {
			return deletedCaseLabels;
		}
		return null;
	}

	public async deleteCaseLabel(labelShortId: string): Promise<CaseLabel | null> {
		if (!labelShortId) return null;
		const labelUuid = this.shortUuid.toUUID(labelShortId);
		if (!this.uuid.isValid(labelUuid)) return null;
		const deletedLabel = await this.getCaseLabel(labelShortId);
		const isLabelDeleted = await this.caseLabelDao.delete(labelUuid);
		if (isLabelDeleted) {
			return deletedLabel;
		}
		return null;
	}
}
