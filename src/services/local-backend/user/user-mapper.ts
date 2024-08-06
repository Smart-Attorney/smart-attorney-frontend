import { UserDTO } from "../dtos/UserDTO";
import { User } from "./user";

export class UserMapper {
	constructor() {}

	public toDto(user: User): UserDTO {
		const newUserDTO = new UserDTO();
		newUserDTO.setId(user.getUserId());
		newUserDTO.setFirstName(user.getFirstName());
		newUserDTO.setLastName(user.getLastName());
		newUserDTO.setFirmName(user.getFirmName());
		newUserDTO.setCompanyEmail(user.getCompanyEmail());
		newUserDTO.setEmail(user.getEmail());
		newUserDTO.setPassword(user.getPassword());
		return newUserDTO;
	}

	public toUser(userDTO: UserDTO): User {
		const newUser = new User();
		newUser.setUserId(userDTO.getId());
		newUser.setFirstName(userDTO.getFirstName());
		newUser.setLastName(userDTO.getLastName());
		newUser.setFirmName(userDTO.getFirmName());
		newUser.setCompanyEmail(userDTO.getCompanyEmail());
		newUser.setEmail(userDTO.getEmail());
		newUser.setPassword(userDTO.getPassword());
		return newUser;
	}
}
