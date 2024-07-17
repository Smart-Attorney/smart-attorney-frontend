import * as bcrypt from "bcryptjs";
import { RegisterUserDTO } from "../../../features/register/api/register";
import { SignInUserDTO } from "../../../features/sign-in/api/sign-in";
import { UserProfile } from "../../../pages/Settings";
import { UserAuthDAO } from "../user-auth/user-auth-dao";
import { UserDAO } from "./user-dao";

export class UserService {
	private userDao: UserDAO;
	private userAuthDao: UserAuthDAO;

	constructor() {
		this.userDao = new UserDAO();
		this.userAuthDao = new UserAuthDAO();
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
		const { companyEmail, password } = data;
		const saltRounds: number = 15;
		const salt = await bcrypt.genSalt(saltRounds);
		const hashedPassword = await bcrypt.hash(password, salt);
		const isUserAuthSaved = await this.userAuthDao.save(companyEmail, salt, hashedPassword);
		if (!isUserAuthSaved) {
			throw new Error("An issue occurred when attempting to register the user.");
		}
		const registeredUser = await this.userDao.save(data);
		if (registeredUser !== null) {
			return registeredUser;
		}
		return null;
	}

	public async verifyUser(data: SignInUserDTO): Promise<{ id: string; firstName: string; lastName: string } | null> {
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
