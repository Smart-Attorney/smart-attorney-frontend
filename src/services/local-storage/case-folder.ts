import { FolderItem } from "../../utils/types";
import StorageArray from "./storage-array";

class CaseFolder extends StorageArray {
	/**
	 *
	 */
	public static getById(folderId: string): FolderItem | null {
		const storedArray = super.get();
		for (let i = 0; i < storedArray.length; i++) {
			if (storedArray[i].id === folderId) {
				return storedArray[i];
			}
		}
		return null;
	}

	public static add(newFolder: FolderItem): FolderItem[] {
		const storedArray = super.get();
		const updatedArray = [...storedArray, newFolder];
		super.set(updatedArray);
		return updatedArray;
	}

	public static delete(folderId: string): FolderItem[] {
		const storedArray = super.get();
		const updatedArray = storedArray.filter((storedFolder) => storedFolder.id !== folderId);
		super.set(updatedArray);
		return updatedArray;
	}
}

export default CaseFolder;
