import { CaseDTO } from "../dtos/CaseDTO";
import { Cases } from "./cases";

export class CasesMapper {
	constructor() {}

	public toDto(cases: Cases): CaseDTO {
		const newCaseDTO = new CaseDTO();
		newCaseDTO.setId(cases.getCaseId());
		newCaseDTO.setName(cases.getCaseName());
		newCaseDTO.setCreatedDate(cases.getCreatedDate());
		newCaseDTO.setLastOpenedDate(cases.getLastOpenedDate());
		newCaseDTO.setIsOpen(cases.getIsOpen());
		return newCaseDTO;
	}

	public toCases(caseDTO: CaseDTO): Cases {
		const newCases = new Cases();
		newCases.setCaseId(caseDTO.getId());
		newCases.setCaseName(caseDTO.getName());
		newCases.setCreatedDate(caseDTO.getCreatedDate());
		newCases.setLastOpenedDate(caseDTO.getLastOpenedDate());
		newCases.setIsOpen(caseDTO.getIsOpen());
		return newCases;
	}
}
