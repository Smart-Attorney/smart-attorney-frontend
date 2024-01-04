import { FolderObj, LabelObj } from "../../utils/types";
import LSArray from "./ls-array";
import { nanoid } from "nanoid";

class CaseLabel extends LSArray {
	/**
	 *
	 */
	public static add(folderId: string, newLabel: string): FolderObj[] {
		const newLabelObj: LabelObj = {
			id: nanoid(10),
			name: newLabel,
		};
		const storedArray = super.get();
		const updatedArray = storedArray.map((storedFolder) =>
			storedFolder.id === folderId
				? { ...storedFolder, labels: [...storedFolder.labels, newLabelObj] }
				: storedFolder
		);
		super.set(updatedArray);
		return updatedArray;
	}

	public static delete(folderId: string, labelId: string): FolderObj[] {
		const storedArray = super.get();
		const updatedArray = storedArray.map((storedFolder) =>
			storedFolder.id === folderId
				? {
						...storedFolder,
						labels: storedFolder.labels.filter((label) => label.id !== labelId),
				  }
				: storedFolder
		);
		super.set(updatedArray);
		return updatedArray;
	}
}

export default CaseLabel;
