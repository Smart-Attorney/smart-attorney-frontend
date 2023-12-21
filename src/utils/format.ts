/**
 * HTML Date Picker Input element stores selected date
 * value in the format of (year/month/day).
 * This function formats the date to be displayed in the
 * desired format of (month/day/year).
 */
const formatDateInput = (date: string) => {
	if (date === "" || date === null || date === undefined) {
		return "__________";
	}
	const dateArray = date.split("-");
	const formattedDate = `${dateArray[1]}/${dateArray[2]}/${dateArray[0]}`;
	return formattedDate;
};

/**
 * Byte conversion function source:
 * https://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript
 */
const formatBytes = (bytes: number, decimals = 1) => {
	if (!+bytes) return "0 Bytes";
	const k = 1000;
	const dm = decimals < 0 ? 0 : decimals;
	const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
	const i = Math.floor(Math.log(bytes) / Math.log(k));
	return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

export { formatDateInput, formatBytes };
