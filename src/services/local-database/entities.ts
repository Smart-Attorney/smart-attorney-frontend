import { DocumentStatus, Sex } from "../../types/api";

// Typically, an entity represents a table in a relational database, and each
// entity instance corresponds to a row in that table.
// https://docs.oracle.com/javaee/6/tutorial/doc/bnbqa.html

export type UserAuthEntity = {
	user_auth_id: string; // uuid v7
	company_email: string;
	salt: string; // bcrypt
	password_hash: string; // bcrypt
};

export type UserEntity = {
	user_id: string; // uuid v7
	first_name: string;
	last_name: string;
	firm_name: string;
	company_email: string;
};

export type CasesEntity = {
	case_id: string; // uuid v7
	case_name: string;
	created_date: number; // unix time ms
	last_opened_date: number; // unix time ms
	is_open: boolean;
	fk_user_id: string; // uuid v7
};

export type CaseLabelEntity = {
	label_id: string; // uuid v7
	label_name: string;
	fk_case_id: string; // uuid v7
};

export type ClientEntity = {
	client_id: string; // uuid v7
	first_name: string;
	middle_name: string;
	last_name: string;
	date_of_birth: number; // unix time ms
	sex: sex_option;
	country_of_citizenship: string;
	primary_language: string;
	fk_case_id: string; // uuid v7
};

export type DocumentEntity = {
	document_id: string; // uuid v7
	document_name: string;
	created_date: number; // unix time ms
	last_opened_date: number; // unix time ms
	status: document_status;
	deadline: number; // unix time ms
	url: string;
	fk_case_id: string; // uuid v7
};

export type sex_option = Sex;

export type document_status = DocumentStatus;
