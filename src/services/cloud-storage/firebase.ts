import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import config from "../../config/firebase-config";

const app = initializeApp(config);
const storage = getStorage(app);

class Firebase {
	/**
	 *
	 */
	// replace saving by fileType with folderId
	static async getFile(fileId: string, fileName: string) {
		const fileNameArray = fileName.split(".");
		const fileType = fileNameArray[fileNameArray.length - 1];
		const fileRef = ref(storage, `${fileType}/${fileId}_${fileName}`);
		try {
			const url = await getDownloadURL(fileRef);
			return url;
		} catch (error) {
			console.log(error);
			return null;
		}
	}

	// replace saving by fileType with folderId
	static async addFile(file: File, fileId: string) {
		const fileName = file.name;
		const fileNameArray = fileName.split(".");
		const fileType = fileNameArray[fileNameArray.length - 1];
		const fileRef = ref(storage, `${fileType}/${fileId}_${fileName}`);
		try {
			const response = await uploadBytes(fileRef, file);
			return response.ref;
		} catch (error) {
			console.log(error);
			return null;
		}
	}
}

export default Firebase;
