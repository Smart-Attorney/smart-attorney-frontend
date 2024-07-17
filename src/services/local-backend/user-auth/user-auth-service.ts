import * as bcrypt from "bcryptjs";
import { RegisterUserDTO } from "../../../features/register/api/register";
import { UserAuthDAO } from "./user-auth-dao";

export class UserAuthService {
	private saltRounds: number = 15;
	private userAuthDao: UserAuthDAO;

	constructor() {
		this.userAuthDao = new UserAuthDAO();
	}

	public async addUserAuth(userData: RegisterUserDTO): Promise<boolean> {
		const { companyEmail, password: plainPassword } = userData;
		const generatedSalt = await bcrypt.genSalt(this.saltRounds);
		const passwordHash = await bcrypt.hash(plainPassword, generatedSalt);
		const isUserAuthSaved = await this.userAuthDao.save(companyEmail, generatedSalt, passwordHash);
		if (isUserAuthSaved) {
			return true;
		}
		return false;
	}

	public async authenticateUser(companyEmail: string, password: string) {
		if (!companyEmail || !password) return null;
		const passwordHash = await this.userAuthDao.getPasswordHashByCompanyEmail(companyEmail);
		if (passwordHash === null) {
			throw new Error("Invalid login credentials.");
		}
		const isMatch = await bcrypt.compare(password, passwordHash);
		if (isMatch) {
			return true;
		}
		return false;
	}
}
