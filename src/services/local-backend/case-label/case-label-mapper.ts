import { CaseLabelDTO } from "../../../utils/dtos/CaseLabelDTO";
import { CaseLabel } from "./case-label";

export class CaseLabelMapper {
	constructor() {}

	public toDto(caseLabel: CaseLabel): CaseLabelDTO {
		const newCaseLabelDTO = new CaseLabelDTO();
		newCaseLabelDTO.setId(caseLabel.getLabelId());
		newCaseLabelDTO.setName(caseLabel.getLabelName());
		return newCaseLabelDTO;
	}

	public toCaseLabel(caseLabelDTO: CaseLabelDTO): CaseLabel {
		const newCaseLabel = new CaseLabel();
		newCaseLabel.setLabelId(caseLabelDTO.getId());
		newCaseLabel.setLabelName(caseLabelDTO.getName());
		return newCaseLabel;
	}
}
