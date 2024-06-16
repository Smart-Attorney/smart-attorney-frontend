import { CaseDTO } from "../../../utils/dtos/CaseDTO";
import { Cases } from "./cases";

export class CasesMapper {
	constructor() {}

	public toDto(cases: Cases): CaseDTO {
		const newCaseDTO = new CaseDTO();
		cases;
		return newCaseDTO;
	}

	public toCases(caseDTO: CaseDTO): Cases {
		const newCases = new Cases();
		caseDTO;
		return newCases;
	}
}
