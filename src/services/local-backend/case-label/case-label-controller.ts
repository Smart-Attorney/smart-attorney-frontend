import { CreateCaseLabelDTO } from "../../../features/dashboard/api/create-case-label";
import { CaseLabelService } from "./case-label-service";

export class CaseLabelController {
	private caseLabelService: CaseLabelService;

	constructor() {
		this.caseLabelService = new CaseLabelService();
	}

	public async getAllUserCaseLabelsHandler(request: Request): Promise<Response> {
		const authHeader = request.headers.get("Authorization");
		if (!authHeader) {
			throw new Error("User is not authorized/signed in.");
		}
		const authToken = JSON.parse(authHeader);
		const userId = authToken.id as string;
		const userCaseLabels = await this.caseLabelService.getAllLabelsByUserId(userId);
		if (userCaseLabels !== null) {
			const body = JSON.stringify(userCaseLabels);
			const options = { status: 200 };
			return new Response(body, options);
		} else {
			throw new Error("There was an error with retrieving the case labels.");
		}
	}

	public async postCaseLabelHandler(request: Request): Promise<Response> {
		const authHeader = request.headers.get("Authorization");
		if (!authHeader) {
			throw new Error("User is not authorized/signed in.");
		}
		const authToken = JSON.parse(authHeader);
		const userId = authToken.id as string;
		const urlArray = request.url.split("/");
		const caseId = urlArray[urlArray.length - 2];
		const body: CreateCaseLabelDTO = await request.json();
		const { name } = body;
		const newLabel = await this.caseLabelService.addCaseLabel(userId, caseId, name);
		if (newLabel !== null) {
			const body = JSON.stringify(newLabel);
			const options = { status: 200 };
			return new Response(body, options);
		} else {
			throw new Error("There was an issue with creating the case label.");
		}
	}

	public async deleteCaseLabelByIdHandler(request: Request): Promise<Response> {
		const authHeader = request.headers.get("Authorization");
		if (!authHeader) {
			throw new Error("User is not authorized/signed in.");
		}
		const authToken = JSON.parse(authHeader);
		const userId = authToken.id as string;
		const urlArray = request.url.split("/");
		const caseId: string = urlArray[urlArray.length - 3];
		const labelId: string = urlArray[urlArray.length - 1];
		const deletedLabel = await this.caseLabelService.deleteCaseLabel(userId, caseId, labelId);
		if (deletedLabel !== null) {
			const body = JSON.stringify(deletedLabel);
			const options = { status: 200 };
			return new Response(body, options);
		} else {
			throw new Error("There was an issue with deleting the case label.");
		}
	}
}
