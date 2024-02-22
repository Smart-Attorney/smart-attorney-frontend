import type { DashboardFolderCardObj } from "../../utils/types";

/* Local Storage Array*/
class LSArray {
	/**
	 *
	 */
	private static STORAGE_KEY: string = "cases";
	private static EMPTY_ARRAY: DashboardFolderCardObj[] = [];

	public static initArray(): void {
		localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.EMPTY_ARRAY));
	}

	public static updateArray(updatedArray: DashboardFolderCardObj[]): void {
		localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedArray));
	}

	public static getArray(): DashboardFolderCardObj[] {
		const storedArray: DashboardFolderCardObj[] = JSON.parse(localStorage.getItem(this.STORAGE_KEY) as string);
		return storedArray;
	}

	public static doesArrayExist(): boolean {
		const storedArray = this.getArray();
		if (storedArray === null) {
			return false;
		}
		return true;
	}
}

export default LSArray;
