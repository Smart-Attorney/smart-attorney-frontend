import { UpdateCaseLastOpenedDateDTO } from "../../../features/case-folder/api/update-case-last-opened-date";
import { UpdateCaseNameDTO } from "../../../features/case-folder/api/update-case-name";
import { CreateCaseDTO } from "../../../features/create-case-folder/api/create-case";
import { UpdateCaseIsOpenDTO } from "../../../features/dashboard/api/update-case-is-open";
import { CasesService } from "./cases-service";

export class CasesController {
	private casesService: CasesService;

	constructor() {
		this.casesService = new CasesService();
	}

	public async getAllCasesByUserIdHandler(request: Request): Promise<Response> {
		const authHeader = request.headers.get("Authorization");
		if (!authHeader) {
			throw new Error("User is not authorized/signed in.");
		}
		const authToken = JSON.parse(authHeader);
		const userId = authToken.id as string;
		const userCases = await this.casesService.getAllCasesByUserId(userId);
		if (userCases !== null) {
			const body = JSON.stringify({ data: userCases });
			const options = { status: 200 };
			return new Response(body, options);
		} else {
			const body = JSON.stringify({ data: null });
			const options = { status: 204, statusText: "No case folders exist for this user." };
			return new Response(body, options);
		}
	}

	public async getCaseByIdHandler(request: Request): Promise<Response> {
		const urlArray = request.url.split("/");
		const caseId = urlArray[urlArray.length - 1];
		const retrievedCase = await this.casesService.getCase(caseId);
		if (retrievedCase !== null) {
			const body = JSON.stringify({ data: retrievedCase });
			const options = { status: 200 };
			return new Response(body, options);
		} else {
			throw new Error("There was an issue with retrieving the case folder.");
		}
	}

	public async postCaseHandler(request: Request): Promise<Response> {
		const authHeader = request.headers.get("Authorization");
		if (!authHeader) {
			throw new Error("User is not authorized/signed in.");
		}
		const authToken = JSON.parse(authHeader);
		const userId = authToken.id as string;
		const body: CreateCaseDTO = await request.json();
		const caseName = body.name;
		const createdCase = await this.casesService.addCase(userId, caseName);
		if (createdCase !== null) {
			const body = JSON.stringify({ data: createdCase });
			const options = { status: 200 };
			return new Response(body, options);
		} else {
			throw new Error("There was an issue with creating the case folder.");
		}
	}

	public async updateLastOpenedDateHandler(request: Request): Promise<Response> {
		const authHeader = request.headers.get("Authorization");
		if (!authHeader) {
			throw new Error("User is not authorized/signed in.");
		}
		// const authToken = JSON.parse(authHeader);
		// const userId = authToken.id as string;
		const urlArray = request.url.split("/");
		const caseId = urlArray[urlArray.length - 1];
		const body: UpdateCaseLastOpenedDateDTO = await request.json();
		const { lastOpenedDate } = body;
		const caseWithUpdatedLastOpenedDate = await this.casesService.updateCaseLastOpenedDate(caseId, lastOpenedDate);
		if (caseWithUpdatedLastOpenedDate !== null) {
			const body = JSON.stringify({ data: caseWithUpdatedLastOpenedDate });
			const options = { status: 200 };
			return new Response(body, options);
		} else {
			throw new Error("There was an issue with updating the case folder last opened date.");
		}
	}

	public async updateNameHandler(request: Request): Promise<Response> {
		const authHeader = request.headers.get("Authorization");
		if (!authHeader) {
			throw new Error("User is not authorized/signed in.");
		}
		// const authToken = JSON.parse(authHeader);
		// const userId = authToken.id as string;
		const urlArray = request.url.split("/");
		const caseId = urlArray[urlArray.length - 1];
		const body: UpdateCaseNameDTO = await request.json();
		const { name } = body;
		const caseWithUpdatedName = await this.casesService.updateCaseName(caseId, name);
		if (caseWithUpdatedName !== null) {
			const body = JSON.stringify({ data: caseWithUpdatedName });
			const options = { status: 200 };
			return new Response(body, options);
		} else {
			throw new Error("There was an issue with updating the case folder name.");
		}
	}

	public async updateIsOpenHandler(request: Request): Promise<Response> {
		const authHeader = request.headers.get("Authorization");
		if (!authHeader) {
			throw new Error("User is not authorized/signed in.");
		}
		// const authToken = JSON.parse(authHeader);
		// const userId = authToken.id as string;
		const urlArray = request.url.split("/");
		const caseId = urlArray[urlArray.length - 1];
		const body: UpdateCaseIsOpenDTO = await request.json();
		const { isOpen } = body;
		const caseWithUpdatedStatus = await this.casesService.updateCaseIsOpen(caseId, isOpen);
		if (caseWithUpdatedStatus !== null) {
			const body = JSON.stringify({ data: caseWithUpdatedStatus });
			const options = { status: 200 };
			return new Response(body, options);
		} else {
			throw new Error("There was an issue with updating the case folder status.");
		}
	}

	public async deleteCaseHandler(request: Request): Promise<Response> {
		const authHeader = request.headers.get("Authorization");
		if (!authHeader) {
			throw new Error("User is not authorized/signed in.");
		}
		const authToken = JSON.parse(authHeader);
		const userId = authToken.id as string;
		const urlArray = request.url.split("/");
		const caseId: string = urlArray[urlArray.length - 1];
		const deletedCase = await this.casesService.deleteCase(userId, caseId);
		if (deletedCase !== null) {
			const body = JSON.stringify({ data: deletedCase });
			const options = { status: 200 };
			return new Response(body, options);
		} else {
			throw new Error("There was an issue with deleting the case folder.");
		}
	}
}
