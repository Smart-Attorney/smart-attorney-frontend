import { initializeApp } from "firebase/app";
import {
	StorageReference,
	deleteObject,
	getDownloadURL,
	getStorage,
	ref,
	uploadBytes,
} from "firebase/storage";
import config from "../../config/firebase-config";

const app = initializeApp(config);
const storage = getStorage(app);

class Firebase {
	/**
	 *
	 */
	public static async getFileById(fileId: string, fileName: string, folderId: string): Promise<string | null> {
		const fileRef = ref(storage, `${folderId}/${fileId}_${fileName}`);
		try {
			const url = await getDownloadURL(fileRef);
			return url;
		} catch (error) {
			console.log(error);
			return null;
		}
	}

	public static async getFileByRef(fileRef: StorageReference | null) {
		if (fileRef === null) return;
		try {
			const url = await getDownloadURL(fileRef);
			return url;
		} catch (error) {
			console.log(error);
			return null;
		}
	}

	public static async uploadFile(
		file: File,
		fileId: string,
		folderId: string
	): Promise<StorageReference | null> {
		const fileName = file.name;
		const fileRef = ref(storage, `${folderId}/${fileId}_${fileName}`);
		try {
			const response = await uploadBytes(fileRef, file);
			return response.ref;
		} catch (error) {
			console.log(error);
			return null;
		}
	}

	public static async deleteFileById(fileId: string, fileName: string, folderId: string): Promise<void> {
		const fileRef = ref(storage, `${folderId}/${fileId}_${fileName}`);
		try {
			await deleteObject(fileRef);
		} catch (error) {
			console.log(error);
		}
	}
}

export default Firebase;