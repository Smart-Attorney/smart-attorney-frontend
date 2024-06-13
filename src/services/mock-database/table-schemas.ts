export interface Users {
	user_id: string;
	first_name: string;
	last_name: string;
	firm_name: string;
	company_email: string;
	email: string;
	password: string;
}

export interface CaseFolders {
	folder_id: string; // from nanoid
	folder_name: string;
	created_date: number; // as unix time
	last_opened_date: number; // as unix time
	status: boolean;
	user_id_fk: string; // from nanoid
}

export interface CaseFiles {
	file_id: string;
	file_name: string;
	created_date: number;
	last_opened_date: number;
	status: document_status;
	deadline: number; // as unix time
	url: string;
	case_folder_id_fk: string;
}

export interface FolderLabels {
	label_id: string;
	label_name: string;
	case_folder_id_fk: string;
}

export interface Clients {
	client_id: string;
	first_name: string;
	middle_name: string;
	last_name: string;
	date_of_birth: number;
	sex: sex_options;
	country_of_citizenship: string;
	primary_language: string;
	case_folder_id_fk: string;
}

export interface CalendarDeadlines {
	folder_id: string;
	folder_name: string;
	deadline: number;
}

export type sex_options = "Male" | "Female" | "Other";

export type document_status = "In Progress" | "In Review" | "Submitted";
