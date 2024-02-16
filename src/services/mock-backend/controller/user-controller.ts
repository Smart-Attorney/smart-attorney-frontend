import { SignInCredentialsDTO } from "../../../features/sign-in/api/sign-in";
import UserService from "../service/user-service";

class UserController {
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
}

export default UserController;
