import type { FolderItem } from "../../utils/types";

class StorageArray {
	/**
	 *
	 */
	private static STORAGE_KEY: string = "cases";
	private static EMPTY_ARRAY: FolderItem[] = [];

	static init(): void {
		localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.EMPTY_ARRAY));
	}

	static set(updatedArray: FolderItem[]): void {
		localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedArray));
	}

	static get(): FolderItem[] {
		const storedArray: FolderItem[] = JSON.parse(localStorage.getItem(this.STORAGE_KEY) as string);
		return storedArray;
	}

	static exists(): boolean {
		const storedArray = this.get();
		if (storedArray === null) {
			return false;
		}
		return true;
	}
}

export default StorageArray;
