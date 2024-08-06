import { CaseLabel } from "../types/api";

export class CaseLabelUtils {
	/**
	 * Returns a Set of unique case labels.
	 * @param labels - Array of case labels
	 * @returns Set of case labels
	 */
	public static unique(labels: CaseLabel[]): Set<string> {
		let uniqueLabels = new Set<string>();
		for (let i = 0, n = labels.length; i < n; i++) {
			uniqueLabels.add(labels[i].name.toLowerCase());
		}
		return uniqueLabels;
	}

	public static alphabetize(labels: CaseLabel[]): CaseLabel[] {
		const sortedLabels = labels.sort((a, b) => {
			const la = a.name;
			const lb = b.name;
			if (la < lb) {
				return -1;
			}
			if (la > lb) {
				return 1;
			}
			return 0;
		});
		return sortedLabels;
	}
}
