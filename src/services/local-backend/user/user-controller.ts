import { RegisterUserDTO } from "../../../features/register/api/register";
import { SignInUserDTO } from "../../../features/sign-in/api/sign-in";
import { UserAuthService } from "../user-auth/user-auth-service";
import { UserService } from "./user-service";

export class UserController {
	private userService: UserService;
	private userAuthService: UserAuthService;

	constructor() {
		this.userService = new UserService();
		this.userAuthService = new UserAuthService();
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
			const body = JSON.stringify({ data: retrievedUser });
			const options = { status: 200 };
			return new Response(body, options);
		} else {
			throw new Error("There was an error with loading the user profile.");
		}
	}

	public async postUserHandler(request: Request) {
		const body: RegisterUserDTO = await request.json();
		const { firstName, lastName, firmName, companyEmail, password } = body;
		try {
			const isPasswordHashed = await this.userAuthService.addUserAuth(companyEmail, password);
			if (!isPasswordHashed) {
				throw new Error("An issue occurred when attempting to register the user.");
			}
			const registeredUser = await this.userService.addUser(firstName, lastName, firmName, companyEmail, password);
			if (registeredUser !== null) {
				const body = JSON.stringify({ data: registeredUser });
				const options = { status: 200 };
				return new Response(body, options);
			} else {
				throw new Error("There was an issue trying to register the user.");
			}
		} catch (error) {
			throw error;
		}
	}

	public async verifyUserHandler(request: Request) {
		const body: SignInUserDTO = await request.json();
		const { companyEmail, password } = body;
		const isUserAuthenticated = await this.userAuthService.authenticateUser(companyEmail, password);
		if (!isUserAuthenticated) {
			throw new Error("Invalid login credentials.");
		}
		const token = await this.userService.getToken(companyEmail);
		if (token !== null) {
			const body = JSON.stringify({ data: token });
			const options = { status: 200 };
			return new Response(body, options);
		} else {
			throw new Error("Invalid login credentials.");
		}
	}
}
