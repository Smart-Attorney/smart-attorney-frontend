import { initializeApp } from "firebase/app";
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytes, getBlob } from "firebase/storage";
import config from "../../config/firebase-config";

const app = initializeApp(config);
const storage = getStorage(app);

export class Firebase {
	public static async uploadFile(userId: string, caseId: string, fileId: string, file: File) {
		const metadata = {
			name: file.name,
			size: file.size,
			contentType: file.type,
		};
		const filePath = `${userId}/${caseId}/${fileId}`;
		const fileRef = ref(storage, filePath);
		try {
			const snapshot = await uploadBytes(fileRef, file, metadata);
			const fileUrl = await getDownloadURL(snapshot.ref);
			return fileUrl;
		} catch (error) {
			console.log(error);
			return null;
		}
	}

	public static async getFileById(userId: string, caseId: string, fileId: string) {
		const filePath = `${userId}/${caseId}/${fileId}`;
		const fileRef = ref(storage, filePath);
		try {
			const url = await getDownloadURL(fileRef);
			return url;
		} catch (error) {
			console.log(error);
			return null;
		}
	}
	public static async getFileByIdReturningBlob(userId: string, caseId: string, fileId: string) {
		const filePath = `${userId}/${caseId}/${fileId}`;
		const fileRef = ref(storage, filePath);
		try {
			const url = await getBlob(fileRef);
			return url;
		} catch (error) {
			console.log(error);
			return null;
		}
	}
	public static async deleteFileById(userId: string, caseId: string, fileId: string) {
		const filePath = `${userId}/${caseId}/${fileId}`;
		const fileRef = ref(storage, filePath);
		try {
			await deleteObject(fileRef);
			return true;
		} catch (error) {
			console.log(error);
			return false;
		}
	}
}
