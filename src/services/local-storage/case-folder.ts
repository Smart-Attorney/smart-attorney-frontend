import { DashboardFolderCardObj } from "../../utils/types";
import LSArray from "./ls-array";

class CaseFolder extends LSArray {
	/**
	 *
	 */
	public static getById(folderId: string): DashboardFolderCardObj | null {
		const storedArray = super.getArray();
		for (let i = 0; i < storedArray.length; i++) {
			if (storedArray[i].id === folderId) {
				return storedArray[i];
			}
		}
		return null;
	}

	public static add(newFolder: DashboardFolderCardObj): DashboardFolderCardObj[] {
		const storedArray = super.getArray();
		const updatedArray = [...storedArray, newFolder];
		super.updateArray(updatedArray);
		return updatedArray;
	}

	public static delete(folderId: string): DashboardFolderCardObj[] {
		const storedArray = super.getArray();
		const updatedArray = storedArray.filter((storedFolder) => storedFolder.id !== folderId);
		super.updateArray(updatedArray);
		return updatedArray;
	}

	public static update(folderId: string, newCaseFolder: DashboardFolderCardObj): DashboardFolderCardObj {
		const storedArray = super.getArray();
		const updatedArray = storedArray.map((storedFolder) =>
			storedFolder.id === folderId ? newCaseFolder : storedFolder
		);
		super.updateArray(updatedArray);
		return newCaseFolder;
	}
}

export default CaseFolder;
