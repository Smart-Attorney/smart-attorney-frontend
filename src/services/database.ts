import { DashboardFolderCardObj } from "../utils/types";
import CaseDeadline from "./local-storage/case-deadline";
import CaseFile from "./local-storage/case-files";
import CaseFolder from "./local-storage/case-folder";
import CaseLabel from "./local-storage/case-label";
import LSArray from "./local-storage/ls-array";

class Database {
	/**************************************************/
	/* Case Folder Array Methods */
	public initNewArray(): void {
		LSArray.initArray();
	}

	public getCaseArray(): DashboardFolderCardObj[] {
		return LSArray.getArray();
	}

	public updateCaseArray(updatedArray: DashboardFolderCardObj[]): void {
		LSArray.updateArray(updatedArray);
	}

	/**************************************************/
	/* Case Folder Methods */
	public getCaseFolderById(folderId: string): DashboardFolderCardObj | null {
		return CaseFolder.getById(folderId);
	}

	public addNewCaseFolder(newFolder: DashboardFolderCardObj): DashboardFolderCardObj[] {
		return CaseFolder.add(newFolder);
	}

	public deleteCaseFolderById(folderId: string): DashboardFolderCardObj[] {
		return CaseFolder.delete(folderId);
	}

	public updateCaseFolder(folderId: string, caseFolder: DashboardFolderCardObj): DashboardFolderCardObj {
		return CaseFolder.update(folderId, caseFolder);
	}

	/**************************************************/
	/* Case Folder Deadline Methods */
	public addCaseFolderDeadline(folderId: string, newDeadline: number): DashboardFolderCardObj[] {
		return CaseDeadline.add(folderId, newDeadline);
	}

	/**************************************************/
	/* Case Folder Label Methods */
	public addCaseFolderLabel(folderId: string, newLabel: string): DashboardFolderCardObj[] {
		return CaseLabel.add(folderId, newLabel);
	}

	public deleteCaseFolderLabelById(folderId: string, labelId: string): DashboardFolderCardObj[] {
		return CaseLabel.delete(folderId, labelId);
	}

	/**************************************************/
	/* Case Folder Label Methods */
	public deleteCaseFileById(folderId: string, fileId: string): DashboardFolderCardObj[] {
		return CaseFile.delete(folderId, fileId);
	}
}

export default Database;
