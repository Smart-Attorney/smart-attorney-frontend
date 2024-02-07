interface Users {
	id: string;
	first_name: string;
	last_name: string;
	firm_name: string;
	company_email: string;
	email: string;
	password: string;
}

interface CaseFolders {
	id: string; // from nanoid
	folder_name: string;
	created_date: number; // as unix time
	last_opened_date: number; // as unix time
	status: string;
	deadline: number; // as unix time
	user_id_fk: string; // from nanoid
}

interface CaseFiles {
	id: string;
	file_name: string;
	created_date: number;
	last_opened_date: number;
	status: string;
	url: string;
	case_folder_id_fk: string;
}

interface FolderLabels {
	id: string;
	label_name: string;
	case_folder_id_fk: string;
}

interface ClientInfo {
	id: string;
	first_name: string;
	last_name: string;
	date_of_birth: number;
	sex: sex_options;
	country_of_citizenship: string;
	primary_language: string;
	case_folder_id_fk: string;
}

enum sex_options {
	Male,
	Female,
	Other,
}

/* 
  ref:         case_folders.user_id_fk > users.id
  ref: folder_labels.case_folder_id_fk > case_folders.id
  ref:    case_files.case_folder_id_fk > case_folders.id
  ref:   client_info.case_folder_id_fk > case_folders.id
*/

export type { CaseFiles, CaseFolders, ClientInfo, FolderLabels, Users };
