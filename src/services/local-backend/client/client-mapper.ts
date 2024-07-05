import { ClientDTO } from "../dtos/ClientDTO";
import { Client } from "./client";

export class ClientMapper {
	constructor() {}

	public toDto(client: Client): ClientDTO {
		const newClientDTO = new ClientDTO();
		newClientDTO.setId(client.getClientId());
		newClientDTO.setFirstName(client.getFirstName());
		newClientDTO.setMiddleName(client.getMiddleName());
		newClientDTO.setLastName(client.getLastName());
		newClientDTO.setDateOfBirth(client.getDateOfBirth());
		newClientDTO.setSex(client.getSex());
		newClientDTO.setCountryOfCitizenship(client.getCountryOfCitizenship());
		newClientDTO.setPrimaryLanguage(client.getPrimaryLanguage());
		return newClientDTO;
	}

	public toClient(clientDTO: ClientDTO): Client {
		const newClient = new Client();
		newClient.setClientId(clientDTO.getId());
		newClient.setFirstName(clientDTO.getFirstName());
		newClient.setMiddleName(clientDTO.getMiddleName());
		newClient.setLastName(clientDTO.getLastName());
		newClient.setDateOfBirth(clientDTO.getDateOfBirth());
		newClient.setSex(clientDTO.getSex());
		newClient.setCountryOfCitizenship(clientDTO.getCountryOfCitizenship());
		newClient.setPrimaryLanguage(clientDTO.getPrimaryLanguage());
		return newClient;
	}
}
