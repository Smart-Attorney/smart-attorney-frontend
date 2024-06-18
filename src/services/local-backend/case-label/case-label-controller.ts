import { CaseLabelService } from "./case-label-service";

export class CaseLabelController {
	private caseLabelService: CaseLabelService;

	constructor() {
		this.caseLabelService = new CaseLabelService();
	}

	public async getAllUserCaseLabels(request: Request): Promise<Response> {
		const authHeader = request.headers.get("Authorization");
		if (!authHeader) {
			throw new Error("User is not authorized/signed in.");
		}
		const authToken = JSON.parse(authHeader);
		const userId = authToken.id as string;
		const userCaseLabels = await this.caseLabelService.getAllByUserId(userId);
		if (userCaseLabels !== null) {
			const body = JSON.stringify(userCaseLabels);
			const options = { status: 200 };
			return new Response(body, options);
		} else {
			throw new Error("There was an error with retrieving the case labels.");
		}
	}
}
