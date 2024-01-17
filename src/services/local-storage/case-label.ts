import { CaseFolderLabelObj, CaseFolderObj } from "../../utils/types";
import nanoid from "../nanoid";
import LSArray from "./ls-array";

class CaseLabel extends LSArray {
	/**
	 *
	 */
	public static add(folderId: string, newLabel: string): CaseFolderObj[] {
		const newLabelObj: CaseFolderLabelObj = {
			id: nanoid(),
			name: newLabel,
		};
		const storedArray = super.getArray();
		const updatedArray = storedArray.map((storedFolder) =>
			storedFolder.id === folderId
				? { ...storedFolder, labels: [...storedFolder.labels, newLabelObj] }
				: storedFolder
		);
		super.updateArray(updatedArray);
		return updatedArray;
	}

	public static delete(folderId: string, labelId: string): CaseFolderObj[] {
		const storedArray = super.getArray();
		const updatedArray = storedArray.map((storedFolder) =>
			storedFolder.id === folderId
				? {
						...storedFolder,
						labels: storedFolder.labels.filter((label) => label.id !== labelId),
				  }
				: storedFolder
		);
		super.updateArray(updatedArray);
		return updatedArray;
	}
}

export default CaseLabel;
