import { SignInCredentialsDTO } from "../../../features/sign-in/api/sign-in";
import { Users } from "../../mock-sql/models";
import DAO from "./dao";

class UserDAO extends DAO {
	static USER_STORAGE_KEY = "users";

	static async findUserByEmail(email: string) {
		const userArray: Users[] = super.getArray(this.USER_STORAGE_KEY);

		for (let i = 0; i < userArray.length; i++) {
			if (userArray[i].email === email) {
				return userArray[i].id;
			}
		}
		return null;
	}

	static async findUserByPassword(password: string) {
		const userArray: Users[] = super.getArray(this.USER_STORAGE_KEY);

		for (let i = 0; i < userArray.length; i++) {
			if (userArray[i].password === password) {
				return userArray[i].id;
			}
		}
		return null;
	}

	static async findUserBySignInCredentials(data: SignInCredentialsDTO) {
		const matchEmail = await this.findUserByEmail(data.email);
		const matchPassword = await this.findUserByPassword(data.password);

		if (!matchPassword) return null;
		if (!matchEmail) return null;

		if (matchEmail === matchPassword) {
			const userArray: Users[] = super.getArray(this.USER_STORAGE_KEY);
			const userId = matchEmail;
			for (let i = 0; i < userArray.length; i++) {
				if (userArray[i].id === userId) {
					return {
						id: userArray[i].id,
						firstName: userArray[i].first_name,
						lastName: userArray[i].last_name,
					};
				}
			}
		}
		return null;
	}
}

export default UserDAO;
