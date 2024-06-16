import { DocumentDTO } from "../../../utils/dtos/DocumentDTO";
import { Document } from "./document";

export class DocumentMapper {
	constructor() {}

	public toDto(document: Document): DocumentDTO {
		const newDocumentDTO = new DocumentDTO();
		newDocumentDTO.setId(document.getDocumentId());
		newDocumentDTO.setName(document.getDocumentName());
		newDocumentDTO.setCreatedDate(document.getCreatedDate());
		newDocumentDTO.setLastOpenedDate(document.getLastOpenedDate());
		newDocumentDTO.setStatus(document.getStatus());
		newDocumentDTO.setDeadline(document.getDeadline());
		newDocumentDTO.setUrl(document.getUrl());
		return newDocumentDTO;
	}

	public toDocument(documentDTO: DocumentDTO): Document {
		const newDocument = new Document();
		newDocument.setDocumentId(documentDTO.getId());
		newDocument.setDocumentName(documentDTO.getName());
		newDocument.setCreatedDate(documentDTO.getCreatedDate());
		newDocument.setLastOpenedDate(documentDTO.getLastOpenedDate());
		newDocument.setStatus(documentDTO.getStatus());
		newDocument.setDeadline(documentDTO.getDeadline());
		newDocument.setUrl(documentDTO.getUrl());
		return newDocument;
	}
}
