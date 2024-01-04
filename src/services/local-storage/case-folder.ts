import { CaseFolderObj } from "../../utils/types";
import LSArray from "./ls-array";

class CaseFolder extends LSArray {
	/**
	 *
	 */
	public static getById(folderId: string): CaseFolderObj | null {
		const storedArray = super.get();
		for (let i = 0; i < storedArray.length; i++) {
			if (storedArray[i].id === folderId) {
				return storedArray[i];
			}
		}
		return null;
	}

	public static add(newFolder: CaseFolderObj): CaseFolderObj[] {
		const storedArray = super.get();
		const updatedArray = [...storedArray, newFolder];
		super.update(updatedArray);
		return updatedArray;
	}

	public static delete(folderId: string): CaseFolderObj[] {
		const storedArray = super.get();
		const updatedArray = storedArray.filter((storedFolder) => storedFolder.id !== folderId);
		super.update(updatedArray);
		return updatedArray;
	}
}

export default CaseFolder;
