import { ShortUuid } from "../../../lib/short-uuid";
import { Uuid } from "../../../lib/uuid";
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
	private uuid: Uuid;

	constructor() {
		this.userDao = new UserDAO();
		this.shortUuid = new ShortUuid();
		this.uuid = new Uuid();
	}

	public async getToken(companyEmail: string): Promise<UserToken | null> {
		if (!companyEmail) return null;
		const userUuid = await this.userDao.getIdByCompanyEmail(companyEmail);
		if (!userUuid) return null;
		const user = await this.userDao.get(userUuid);
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

	public async getUser(userShortId: string) {
		if (!userShortId) return null;
		const userUuid = this.shortUuid.toUUID(userShortId);
		if (!this.uuid.isValid(userUuid)) return null;
		const foundUser = await this.userDao.get(userUuid);
		if (foundUser !== null) {
			const userProfile: UserProfile = {
				// id: this.shortUuid.toShort(foundUser.user_id),
				firstName: foundUser.first_name,
				lastName: foundUser.last_name,
				// firmName: foundUser.firm_name,
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
		const userUuid = await this.userDao.getIdByCompanyEmail(companyEmail);
		if (userUuid !== null) {
			throw new Error("This email already exists.");
		}
		const newUserUuid = await this.userDao.save(firstName, lastName, firmName, companyEmail);
		if (newUserUuid !== null) {
			const newUserShortId = this.shortUuid.toShort(newUserUuid);
			return await this.getUser(newUserShortId);
		}
		return null;
	}
}
