import { ShortUuid } from "../../../lib/short-uuid";
import { UserProfile } from "../../../pages/Settings";
import { UserDAO } from "./user-dao";

type UserToken = {
	id: string; // short uuid
	firstName: string;
	lastName: string;
};

export class UserService {
	private userDao: UserDAO;
	private shortUuid: ShortUuid;

	constructor() {
		this.userDao = new UserDAO();
		this.shortUuid = new ShortUuid();
	}

	public async getToken(companyEmail: string): Promise<UserToken | null> {
		if (!companyEmail) return null;
		const userId = await this.userDao.getIdByCompanyEmail(companyEmail);
		if (!userId) return null;
		const user = await this.userDao.get(userId);
		if (user !== null) {
			const token: UserToken = {
				id: this.shortUuid.toShort(user.user_id),
				firstName: user.first_name,
				lastName: user.last_name,
			};
			return token;
		}
		return null;
	}

	public async getUser(userId: string) {
		if (!userId) return null;
		if (!this.shortUuid.validate(userId)) return null;
		const foundUser = await this.userDao.get(this.shortUuid.toUuid(userId));
		if (foundUser !== null) {
			const userProfile: UserProfile = {
				id: this.shortUuid.toShort(foundUser.user_id),
				firstName: foundUser.first_name,
				lastName: foundUser.last_name,
				firmName: foundUser.firm_name,
				companyEmail: foundUser.company_email,
			};
			return userProfile;
		}
		return null;
	}

	public async addUser(
		firstName: string,
		lastName: string,
		firmName: string,
		companyEmail: string,
		password: string
	): Promise<UserProfile | null> {
		if (firstName.trim().length === 0) return null;
		if (lastName.trim().length === 0) return null;
		if (firmName.trim().length === 0) return null;
		if (companyEmail.trim().length === 0) return null;
		if (password.trim().length === 0) return null;
		const userId = await this.userDao.getIdByCompanyEmail(companyEmail);
		if (userId !== null) {
			throw new Error("This email already exists.");
		}
		const newUserId = await this.userDao.save(firstName, lastName, firmName, companyEmail);
		if (newUserId !== null) {
			return await this.getUser(newUserId);
		}
		return null;
	}
}
