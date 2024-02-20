import { CaseFileObj } from "../../../utils/types";
import { Firebase } from "../../cloud-storage/firebase";
import { CaseFileDAO } from "../dao/case-file-dao";

export class CaseFileService {
	static async createCaseFiles(userId: string, folderId: string, files: File[]) {
		if (!folderId || !files) {
			return null;
		}
		const fileArray: CaseFileObj[] = [];
		for (let i = 0; i < files.length; i++) {
			const { name } = files[i];
			const fileId = name.split("/")[0];
			const fileName = name.split("/")[1];
			const fileUrl = await Firebase.uploadFile(userId, folderId, fileId, files[i]);
			if (fileUrl !== null) {
				const newCaseFile = await CaseFileDAO.addNewCaseFile(fileId, fileName, fileUrl, folderId);
				if (newCaseFile !== null) {
					fileArray.push({
						id: newCaseFile.file_id,
						name: newCaseFile.file_name,
						createdDate: newCaseFile.created_date,
						lastOpenedDate: newCaseFile.last_opened_date,
						status: newCaseFile.status,
						url: newCaseFile.url,
					});
				}
			}
		}
		return fileArray;
	}
}
