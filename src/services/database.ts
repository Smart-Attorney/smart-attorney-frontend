import LSArray from "./local-storage/ls-array";
import CaseFolder from "./local-storage/case-folder";
import CaseDeadline from "./local-storage/case-deadline";
import CaseLabel from "./local-storage/case-label";
import CaseFile from "./local-storage/case-files";
import { CaseFolderObj } from "../utils/types";

class Database {
	/**************************************************/
	/* Case Folder Array Methods */
	public initNewArray(): void {
		LSArray.initArray();
	}

	public getCaseArray(): CaseFolderObj[] {
		return LSArray.getArray();
	}

	public updateCaseArray(updatedArray: CaseFolderObj[]): void {
		LSArray.updateArray(updatedArray);
	}

	/**************************************************/
	/* Case Folder Methods */
	public getCaseFolderById(folderId: string): CaseFolderObj | null {
		return CaseFolder.getById(folderId);
	}

	public addNewCaseFolder(newFolder: CaseFolderObj): CaseFolderObj[] {
		return CaseFolder.add(newFolder);
	}

	public deleteCaseFolderById(folderId: string): CaseFolderObj[] {
		return CaseFolder.delete(folderId);
	}

	public updateCaseFolder(folderId: string, caseFolder: CaseFolderObj): CaseFolderObj {
		return CaseFolder.update(folderId, caseFolder);
	}

	/**************************************************/
	/* Case Folder Deadline Methods */
	public addCaseFolderDeadline(folderId: string, newDeadline: string): CaseFolderObj[] {
		return CaseDeadline.add(folderId, newDeadline);
	}

	/**************************************************/
	/* Case Folder Label Methods */
	public addCaseFolderLabel(folderId: string, newLabel: string): CaseFolderObj[] {
		return CaseLabel.add(folderId, newLabel);
	}

	public deleteCaseFolderLabelById(folderId: string, labelId: string): CaseFolderObj[] {
		return CaseLabel.delete(folderId, labelId);
	}

	/**************************************************/
	/* Case Folder Label Methods */
	public deleteCaseFileById(folderId: string, fileId: string): CaseFolderObj[] {
		return CaseFile.delete(folderId, fileId);
	}
}

export default Database;
