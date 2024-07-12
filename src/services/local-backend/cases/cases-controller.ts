import { UpdateCaseLastOpenedDateDTO } from "../../../features/case-folder/api/update-case-last-opened-date";
import { UpdateCaseNameDTO } from "../../../features/case-folder/api/update-case-name";
import { CreateCaseDTO } from "../../../features/create-case-folder/api/create-case";
import { CasesService } from "./cases-service";

export class CasesController {
	private casesService: CasesService;

	constructor() {
		this.casesService = new CasesService();
	}

	public async getAllCasesByUserId(request: Request): Promise<Response> {
		const authHeader = request.headers.get("Authorization");
		if (!authHeader) {
			throw new Error("User is not authorized/signed in.");
		}
		const authToken = JSON.parse(authHeader);
		const userId = authToken.id as string;
		const userCases = await this.casesService.getAllByUserId(userId);
		if (userCases !== null) {
			const body = JSON.stringify(userCases);
			const options = { status: 200 };
			return new Response(body, options);
		} else {
			const body = null;
			const options = { status: 204, statusText: "No case folders exist for this user." };
			return new Response(body, options);
		}
	}

	public async getCaseById(request: Request): Promise<Response> {
		const urlArray = request.url.split("/");
		const caseId = urlArray[urlArray.length - 1];
		const retrievedCase = await this.casesService.getById(caseId);
		if (retrievedCase !== null) {
			const body = JSON.stringify(retrievedCase);
			const options = { status: 200 };
			return new Response(body, options);
		} else {
			throw new Error("There was an issue with retrieving the case folder.");
		}
	}

	public async createCase(request: Request): Promise<Response> {
		const authHeader = request.headers.get("Authorization");
		if (!authHeader) {
			throw new Error("User is not authorized/signed in.");
		}
		const authToken = JSON.parse(authHeader);
		const userId = authToken.id as string;
		const body: CreateCaseDTO = await request.json();
		const caseId = body.id;
		const caseName = body.name;
		const createdCase = await this.casesService.create(userId, caseId, caseName);
		if (createdCase !== null) {
			const body = JSON.stringify(createdCase);
			const options = { status: 200 };
			return new Response(body, options);
		} else {
			throw new Error("There was an issue with creating the case folder.");
		}
	}

	public async createLabel(request: Request): Promise<Response> {
		const authHeader = request.headers.get("Authorization");
		if (!authHeader) {
			throw new Error("User is not authorized/signed in.");
		}
		const authToken = JSON.parse(authHeader);
		const userId = authToken.id as string;
		const urlArray = request.url.split("/");
		const caseId = urlArray[urlArray.length - 1];
		const newLabel = (await request.json()) as string;
		const caseWithNewLabel = await this.casesService.createLabel(userId, caseId, newLabel);
		if (caseWithNewLabel !== null) {
			const body = JSON.stringify(caseWithNewLabel);
			const options = { status: 200 };
			return new Response(body, options);
		} else {
			throw new Error("There was an issue with creating the case folder label.");
		}
	}

	public async updateLastOpenedDate(request: Request): Promise<Response> {
		const authHeader = request.headers.get("Authorization");
		if (!authHeader) {
			throw new Error("User is not authorized/signed in.");
		}
		const authToken = JSON.parse(authHeader);
		const userId = authToken.id as string;
		const body: UpdateCaseLastOpenedDateDTO = await request.json();
		const { id } = body;
		const updatedDate = await this.casesService.updateLastOpenedDate(userId, id);
		if (updatedDate !== null) {
			const updatedCaseFolders = await this.casesService.getAllByUserId(userId);
			const body = JSON.stringify(updatedCaseFolders);
			const options = { status: 200 };
			return new Response(body, options);
		} else {
			throw new Error("There was an issue with updating the case folder last opened date.");
		}
	}

	public async updateName(request: Request): Promise<Response> {
		const authHeader = request.headers.get("Authorization");
		if (!authHeader) {
			throw new Error("User is not authorized/signed in.");
		}
		const authToken = JSON.parse(authHeader);
		const userId = authToken.id as string;
		const urlArray = request.url.split("/");
		const caseId = urlArray[urlArray.length - 1];
		const body: UpdateCaseNameDTO = await request.json();
		const { name } = body;
		const caseWithUpdatedName = await this.casesService.updateName(userId, caseId, name);
		if (caseWithUpdatedName !== null) {
			const body = JSON.stringify(caseWithUpdatedName);
			const options = { status: 200 };
			return new Response(body, options);
		} else {
			throw new Error("There was an issue with updating the case folder name.");
		}
	}

	public async updateOpenState(request: Request): Promise<Response> {
		const authHeader = request.headers.get("Authorization");
		if (!authHeader) {
			throw new Error("User is not authorized/signed in.");
		}
		const authToken = JSON.parse(authHeader);
		const userId = authToken.id as string;
		const urlArray = request.url.split("/");
		const caseId = urlArray[urlArray.length - 1];
		const currentState: boolean = await request.json();
		const caseWithUpdatedStatus = await this.casesService.updateOpenStatus(userId, caseId, currentState);
		if (caseWithUpdatedStatus !== null) {
			const body = JSON.stringify(caseWithUpdatedStatus);
			const options = { status: 200 };
			return new Response(body, options);
		} else {
			throw new Error("There was an issue with updating the case folder status.");
		}
	}

	public async deleteCaseLabel(request: Request): Promise<Response> {
		const authHeader = request.headers.get("Authorization");
		if (!authHeader) throw new Error("User is not authorized/signed in.");
		const authToken = JSON.parse(authHeader);
		const userId = authToken.id as string;
		const urlArray = request.url.split("/");
		const caseId: string = urlArray[urlArray.length - 2];
		const labelId: string = urlArray[urlArray.length - 1];
		const caseWithDeletedLabel = await this.casesService.deleteLabelById(userId, caseId, labelId);
		if (caseWithDeletedLabel !== null) {
			const body = JSON.stringify(caseWithDeletedLabel);
			const options = { status: 200 };
			return new Response(body, options);
		} else {
			throw new Error("There was an issue with deleting the case folder label.");
		}
	}

	public async deleteCaseFolder(request: Request): Promise<Response> {
		const authHeader = request.headers.get("Authorization");
		if (!authHeader) {
			throw new Error("User is not authorized/signed in.");
		}
		const authToken = JSON.parse(authHeader);
		const userId = authToken.id as string;
		const urlArray = request.url.split("/");
		const caseId: string = urlArray[urlArray.length - 1];
		const deletedCase = await this.casesService.deleteById(userId, caseId);
		if (deletedCase !== null) {
			const body = JSON.stringify(deletedCase);
			const options = { status: 200 };
			return new Response(body, options);
		} else {
			throw new Error("There was an issue with deleting the case folder.");
		}
	}
}
