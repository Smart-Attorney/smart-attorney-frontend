import { RegisterUserDTO } from "../../../features/register/api/register";
import { SignInUserDTO } from "../../../features/sign-in/api/sign-in";
import { UserProfile } from "../../../pages/Settings";
import { UserDAO } from "./user-dao";

type UserToken = {
	id: string;
	firstName: string;
	lastName: string;
};

export class UserService {
	private userDao: UserDAO;

	constructor() {
		this.userDao = new UserDAO();
	}

	public async getUser(userId: string) {
		if (!userId) return null;
		const foundUser = await this.userDao.get(userId);
		if (foundUser !== null) {
			const userProfile: UserProfile = {
				firstName: foundUser.first_name,
				lastName: foundUser.last_name,
				firmName: foundUser.firm_name,
				companyEmail: foundUser.company_email,
			};
			return userProfile;
		}
		return null;
	}

	public async getToken(userData: SignInUserDTO): Promise<UserToken | null> {
		const { companyEmail } = userData;
		if (!companyEmail) return null;
		const userId = await this.userDao.getIdByCompanyEmail(companyEmail);
		if (!userId) return null;
		const user = await this.userDao.get(userId);
		if (user !== null) {
			const token: UserToken = {
				id: user.user_id,
				firstName: user.first_name,
				lastName: user.last_name,
			};
			return token;
		}
		return null;
	}

	public async addUser(data: RegisterUserDTO) {
		if (data.firstName.trim().length === 0) return null;
		if (data.lastName.trim().length === 0) return null;
		if (data.firmName.trim().length === 0) return null;
		if (data.companyEmail.trim().length === 0) return null;
		if (data.password.trim().length === 0) return null;
		const userId = await this.userDao.getIdByCompanyEmail(data.companyEmail);
		if (userId !== null) {
			throw new Error("This email already exists.");
		}
		const registeredUser = await this.userDao.save(data);
		if (registeredUser !== null) {
			return registeredUser;
		}
		return null;
	}
}
