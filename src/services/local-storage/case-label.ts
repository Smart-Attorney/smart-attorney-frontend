import StorageArray from "./storage-array";

class CaseLabel extends StorageArray {
	/**
	 *
	 */
	static add(folderId: string, newLabel: string) {
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
	static delete(folderId: string, selectedLabel: string) {
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
