import { DocumentStatus, Sex } from "../../types/api";

// Typically, an entity represents a table in a relational database, and each
// entity instance corresponds to a row in that table.
// https://docs.oracle.com/javaee/6/tutorial/doc/bnbqa.html

export type UserEntity = {
	user_id: string;
	first_name: string;
	last_name: string;
	firm_name: string;
	company_email: string;
	password: string;
};

export type CasesEntity = {
	case_id: string; // from nanoid
	case_name: string;
	created_date: number; // as unix time
	last_opened_date: number; // as unix time
	is_open: boolean;
	fk_user_id: string; // from nanoid
};

export type CaseLabelEntity = {
	label_id: string;
	label_name: string;
	fk_case_id: string;
};

export type ClientEntity = {
	client_id: string;
	first_name: string;
	middle_name: string;
	last_name: string;
	date_of_birth: number;
	sex: sex_option;
	country_of_citizenship: string;
	primary_language: string;
	fk_case_id: string;
};

export type DocumentEntity = {
	document_id: string;
	document_name: string;
	created_date: number;
	last_opened_date: number;
	status: document_status;
	deadline: number; // as unix time
	url: string;
	fk_case_id: string;
};

export type sex_option = Sex;

export type document_status = DocumentStatus;
