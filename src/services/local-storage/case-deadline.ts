import { DashboardFolderCardObj } from "../../utils/types";
import LSArray from "./ls-array";

class CaseDeadline extends LSArray {
	/**
	 *
	 */
	public static add(folderId: string, newDeadline: number): DashboardFolderCardObj[] {
		const storedArray = super.getArray();
		const updatedArray = storedArray.map((storedFolder) =>
			storedFolder.id === folderId ? { ...storedFolder, deadline: newDeadline } : storedFolder
		);
		super.updateArray(updatedArray);
		return updatedArray;
	}
}

export default CaseDeadline;
