import { RegisterCredentialsDTO } from "../../../features/register/api/register";
import { SignInCredentialsDTO } from "../../../features/sign-in/api/sign-in";
import { UserDAO } from "../dao/user-dao";

export class UserService {
	static async verifyUser(data: SignInCredentialsDTO) {
		if (data.companyEmail.trim().length === 0) return null;
		if (data.password.trim().length === 0) return null;
		const foundIdByCompanyEmail = await UserDAO.getUserIdByCompanyEmail(data.companyEmail);
		const foundIdByPassword = await UserDAO.getUserIdByPassword(data.password);
		if (!foundIdByCompanyEmail) return null;
		if (!foundIdByPassword) return null;
		if (foundIdByCompanyEmail !== foundIdByPassword) return null;
		const userData = await UserDAO.getUserById(foundIdByPassword);
		if (userData) {
			const foundUser = {
				id: userData.user_id,
				firstName: userData.first_name,
				lastName: userData.last_name,
			};
			return foundUser;
		}
		return null;
	}

	static async registerUser(data: RegisterCredentialsDTO) {
		if (data.firstName.trim().length === 0) return null;
		if (data.lastName.trim().length === 0) return null;
		if (data.firmName.trim().length === 0) return null;
		if (data.companyEmail.trim().length === 0) return null;
		if (data.password.trim().length === 0) return null;
		const registeredUser = await UserDAO.createUser(data);

		if (registeredUser) {
			return registeredUser;
		}
		return null;
	}

	static async getUser(userId: string) {
		if (!userId) {
			return null;
		}
		const retrievedUser = await UserDAO.getUserById(userId);
		if (retrievedUser !== null) {
			return retrievedUser;
		}
		return null;
	}
}
