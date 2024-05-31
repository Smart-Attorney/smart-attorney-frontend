import { CaseFileObj } from "./types";

export const getMostUrgentDocumentDeadline = (documents: CaseFileObj[]): number => {
	if (!documents) return 0;
	const placeholderDate = 3250368000000; // (milliseconds) Wed Jan 01 3000 00:00:00 GMT+0000
	const currentDate = Date.now();
	let mostUrgentDeadline = placeholderDate;
	for (let i = 0, n = documents.length; i < n; i++) {
		if (documents[i].deadline === 0) continue;
		if (documents[i].deadline < currentDate) continue;
		if (documents[i].deadline < mostUrgentDeadline) {
			mostUrgentDeadline = documents[i].deadline;
		}
	}
	if (mostUrgentDeadline === placeholderDate) {
		return 0;
	}
	return mostUrgentDeadline;
};
