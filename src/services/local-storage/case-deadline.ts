import { FolderObj } from "../../utils/types";
import LSArray from "./ls-array";

class CaseDeadline extends LSArray {
	/**
	 *
	 */
	public static add(folderId: string, newDeadline: string): FolderObj[] {
		const storedArray = super.get();
		const updatedArray = storedArray.map((storedFolder) =>
			storedFolder.id === folderId ? { ...storedFolder, deadline: newDeadline } : storedFolder
		);
		super.set(updatedArray);
		return updatedArray;
	}
}

export default CaseDeadline;
