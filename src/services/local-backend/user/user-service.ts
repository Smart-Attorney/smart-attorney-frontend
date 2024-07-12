import { RegisterUserDTO } from "../../../features/register/api/register";
import { SignInCredentialsDTO } from "../../../features/sign-in/api/sign-in";
import { UserDAO } from "./user-dao";

export class UserService {
	private userDao: UserDAO;

	constructor() {
		this.userDao = new UserDAO();
	}

	public async getById(userId: string) {
		if (!userId) return null;
		const retrievedUser = await this.userDao.getById(userId);
		if (retrievedUser !== null) {
			return retrievedUser;
		}
		return null;
	}

	public async register(data: RegisterUserDTO) {
		if (data.firstName.trim().length === 0) return null;
		if (data.lastName.trim().length === 0) return null;
		if (data.firmName.trim().length === 0) return null;
		if (data.companyEmail.trim().length === 0) return null;
		if (data.password.trim().length === 0) return null;
		const registeredUser = await this.userDao.add(data);
		if (registeredUser !== null) {
			return registeredUser;
		}
		return null;
	}

	public async verify(data: SignInCredentialsDTO): Promise<{ id: string; firstName: string; lastName: string } | null> {
		const { companyEmail, password } = data;
		if (companyEmail.trim().length === 0) return null;
		if (password.trim().length === 0) return null;
		const foundUser = await this.userDao.getByCompanyEmailAndPassword(companyEmail, password);
		if (foundUser !== null) {
			const verifiedUser = {
				id: foundUser.user_id,
				firstName: foundUser.first_name,
				lastName: foundUser.last_name,
			};
			return verifiedUser;
		}
		return null;
	}
}
