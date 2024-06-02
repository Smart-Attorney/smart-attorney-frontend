import { CaseFolderLabelObj } from "./types";

export class CaseLabelUtils {
	public static filterUniqueLabels(labels: CaseFolderLabelObj[]): Map<string, string> {
		let labelsMap = new Map<string, string>();
		for (let i = 0, n = labels.length; i < n; i++) {
			if (!labelsMap.has(labels[i].name.toLowerCase())) {
				labelsMap.set(labels[i].name.toLowerCase(), labels[i].name);
			}
		}
		return labelsMap;
	}
}
