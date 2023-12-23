import { FolderItem } from "../../utils/types";
import StorageArray from "./storage-array";

class CaseLabel extends StorageArray {
	/**
	 *
	 */
	public static add(folderId: string, newLabel: string): FolderItem[] {
		const storedArray = super.get();
		const updatedArray = storedArray.map((storedFolder) =>
			storedFolder.id === folderId
				? { ...storedFolder, labels: [...storedFolder.labels, newLabel] }
				: storedFolder
		);
		super.set(updatedArray);
		return updatedArray;
	}

	/**
	 * TODO:
	 * Update this method once each label is identified by
	 * its own unique id.
	 */
	public static delete(folderId: string, selectedLabel: string): FolderItem[] {
		const storedArray = super.get();
		const updatedArray = storedArray.map((storedFolder) =>
			storedFolder.id === folderId
				? {
						...storedFolder,
						labels: storedFolder.labels.filter((label) => label !== selectedLabel),
				  }
				: storedFolder
		);
		super.set(updatedArray);
		return updatedArray;
	}
}

export default CaseLabel;
