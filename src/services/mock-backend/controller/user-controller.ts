import { RegisterCredentialsDTO } from "../../../features/register/api/register";
import { SignInCredentialsDTO } from "../../../features/sign-in/api/sign-in";
import { UserService } from "../service/user-service";

export class UserController {
	static async verifyUser(request: Request) {
		const data: SignInCredentialsDTO = await request.json();
		const verifiedUserID = await UserService.verifyUser(data);
		if (verifiedUserID !== null) {
			const body = JSON.stringify(verifiedUserID);
			const options = { status: 200 };
			return new Response(body, options);
		} else {
			throw new Error("Invalid login credentials.");
		}
	}

	static async registerUser(request: Request) {
		const data: RegisterCredentialsDTO = await request.json();
		const registeredUser = await UserService.registerUser(data);
		if (registeredUser !== null) {
			const body = JSON.stringify(registeredUser);
			const options = { status: 200 };
			return new Response(body, options);
		} else {
			throw new Error("There was an issue trying to register the user.");
		}
	}

	static async getUser(request: Request) {
		const authHeader = request.headers.get("Authorization");
		if (!authHeader) {
			throw new Error("User is not authorized/signed in.");
		}
		const authToken = JSON.parse(authHeader);
		const userId: string = authToken.id;
		const retrievedUser = await UserService.getUser(userId);
		if (retrievedUser !== null) {
			const body = JSON.stringify(retrievedUser);
			const options = { status: 200 };
			return new Response(body, options);
		} else {
			throw new Error("There was an error with loading the user profile.");
		}
	}
}
