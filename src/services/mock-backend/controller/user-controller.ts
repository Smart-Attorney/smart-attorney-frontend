import { SignInCredentialsDTO } from "../../../features/sign-in/api/sign-in";
import UserService from "../service/user-service";

class UserController {
	static async verifyUser(data: SignInCredentialsDTO) {
		const verifiedUserID = await UserService.verifyUser(data);

		if (verifiedUserID !== null) {
			return verifiedUserID;
		} else {
			throw new Error("Invalid login credentials.");
		}
	}
}

export default UserController;
