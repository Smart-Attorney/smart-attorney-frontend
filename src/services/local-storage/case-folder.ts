import StorageArray from "./storage-array";

class CaseFolder extends StorageArray {
	/**
	 *
	 */
	static findById(folderId: string) {
		const storedArray = super.get();
		for (let i = 0; i < storedArray.length; i++) {
			if (storedArray[i].id === folderId) {
				return true;
			}
		}
		return false;
	}

	static delete(folderId: string) {
		const storedArray = super.get();
		const updatedArray = storedArray.filter((storedFolder) => storedFolder.id !== folderId);
		super.set(updatedArray);
		return updatedArray;
	}
}

export default CaseFolder;
