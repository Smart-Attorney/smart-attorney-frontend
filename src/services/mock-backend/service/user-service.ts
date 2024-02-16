import { SignInCredentialsDTO } from "../../../features/sign-in/api/sign-in";
import UserDAO from "../dao/user-dao";

class UserService {
	static async verifyUser(data: SignInCredentialsDTO) {
		const emailFieldEmpty = data.email.trim().length === 0;
		const passwordFieldEmpty = data.password.trim().length === 0;

		if (emailFieldEmpty) return null;
		if (passwordFieldEmpty) return null;

		const foundUser = await UserDAO.verifyUserCredentials(data);
		return foundUser;
	}
}

export default UserService;
