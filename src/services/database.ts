import LSArray from "./local-storage/ls-array";
import CaseFolder from "./local-storage/case-folder";
import CaseDeadline from "./local-storage/case-deadline";
import CaseLabel from "./local-storage/case-label";
import { FolderObj } from "../utils/types";

class Database {
	/**************************************************/
	/* Case Folder Array Methods */
	public initNewArray(): void {
		LSArray.init();
	}

	public getCaseArray(): FolderObj[] {
		return LSArray.get();
	}

	/**************************************************/
	/* Case Folder Methods */
	public getCaseFolderById(folderId: string): FolderObj | null {
		return CaseFolder.getById(folderId);
	}

	public addNewCaseFolder(newFolder: FolderObj): FolderObj[] {
		return CaseFolder.add(newFolder);
	}

	public deleteCaseFolderById(folderId: string): FolderObj[] {
		return CaseFolder.delete(folderId);
	}

	/**************************************************/
	/* Case Folder Deadline Methods */
	public addCaseFolderDeadline(folderId: string, newDeadline: string): FolderObj[] {
		return CaseDeadline.add(folderId, newDeadline);
	}

	/**************************************************/
	/* Case Folder Label Methods */
	public addCaseFolderLabel(folderId: string, newLabel: string): FolderObj[] {
		return CaseLabel.add(folderId, newLabel);
	}

	public deleteCaseFolderLabelById(folderId: string, labelId: string): FolderObj[] {
		return CaseLabel.delete(folderId, labelId);
	}
}

export default Database;
