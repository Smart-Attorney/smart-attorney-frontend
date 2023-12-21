import StorageArray from "./storage-array";

class CaseDeadline extends StorageArray {
	/**
	 *
	 */
	static add(folderId: string, newDeadline: string) {
		const storedArray = super.get();
		const updatedArray = storedArray.map((storedFolder) =>
			storedFolder.id === folderId ? { ...storedFolder, deadline: newDeadline } : storedFolder
		);
		super.set(updatedArray);
		return updatedArray;
	}
}

export default CaseDeadline;
