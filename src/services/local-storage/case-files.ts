import { CaseFolderObj } from "../../utils/types";
import LSArray from "./ls-array";
// import { nanoid } from "nanoid";

class CaseFile extends LSArray {
	/**
	 *
	 */
	// public static add(folderId: string, caseFile: CaseFileObj): CaseFolderObj {
	//   const newCaseFile: CaseFileObj = {
	//     id: nanoid(8),
	//     name: ,
	//     status: ,
	//     url: ,
	//   }

	//   const storedArray = super.getArray();
	//   const updatedArray = storedArray.map()
	//   super.updateArray(updatedArray)
	//   return updatedArray;
	//  };

	public static delete(folderId: string, fileId: string): CaseFolderObj[] {
		const storedArray = super.getArray();
		const updatedArray = storedArray.map((storedFolder) =>
			storedFolder.id === folderId
				? {
						...storedFolder,
						files: storedFolder.files.filter((file) => file.id !== fileId),
				  }
				: storedFolder
		);
		super.updateArray(updatedArray);
		return updatedArray;
	}
}

export default CaseFile;

/**
 * RESUME
 *
 * build out these methods
 * then finish deleting files feature
 * then fix feature for uploading additional files
 */
