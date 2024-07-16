import { RegisterUserDTO } from "../../../features/register/api/register";
import { SignInUserDTO } from "../../../features/sign-in/api/sign-in";
import { UserService } from "./user-service";

export class UserController {
	private userService: UserService;

	constructor() {
		this.userService = new UserService();
	}

	public async getUserHandler(request: Request) {
		const authHeader = request.headers.get("Authorization");
		if (!authHeader) {
			throw new Error("User is not authorized/signed in.");
		}
		const authToken = JSON.parse(authHeader);
		const userId: string = authToken.id;
		const retrievedUser = await this.userService.getUser(userId);
		if (retrievedUser !== null) {
			const body = JSON.stringify(retrievedUser);
			const options = { status: 200 };
			return new Response(body, options);
		} else {
			throw new Error("There was an error with loading the user profile.");
		}
	}

	public async postUserHandler(request: Request) {
		const userData: RegisterUserDTO = await request.json();
		const registeredUser = await this.userService.addUser(userData);
		if (registeredUser !== null) {
			const body = JSON.stringify(registeredUser);
			const options = { status: 200 };
			return new Response(body, options);
		} else {
			throw new Error("There was an issue trying to register the user.");
		}
	}

	public async verifyUserHandler(request: Request) {
		const data: SignInUserDTO = await request.json();
		const verifiedUserToken = await this.userService.verifyUser(data);
		if (verifiedUserToken !== null) {
			const body = JSON.stringify(verifiedUserToken);
			const options = { status: 200 };
			return new Response(body, options);
		} else {
			throw new Error("Invalid login credentials.");
		}
	}
}
