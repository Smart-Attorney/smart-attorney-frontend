/**
 * HTML Date Picker Input element stores selected date
 * value in the format of (year/month/day).
 * This function formats the date to be displayed in the
 * desired format of (month/day/year).
 */
export const formatUnixDateToStringDate = (unixDate: number): string => {
	const date = new Date(unixDate);
	let year = date.getUTCFullYear().toString();
	let month = (date.getUTCMonth() + 1).toString();
	let day = date.getUTCDate().toString();
	month = month.length === 1 ? "0" + month : month;
	day = day.length === 1 ? "0" + day : day;
	const formattedDate = `${month}/${day}/${year}`;
	return formattedDate;
};

export const formatUnixDateToInputField = (unixDate: number): string => {
	const date = new Date(unixDate);
	let year = date.getUTCFullYear().toString();
	let month = (date.getUTCMonth() + 1).toString();
	let day = date.getUTCDate().toString();
	month = month.length === 1 ? "0" + month : month;
	day = day.length === 1 ? "0" + day : day;
	const formattedDate = `${year}-${month}-${day}`;
	return formattedDate;
};

/**
 * Byte conversion function source:
 * https://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript
 */
export const formatBytes = (bytes: number, decimals = 1): string => {
	if (!+bytes) return "0 Bytes";
	const k = 1000;
	const dm = decimals < 0 ? 0 : decimals;
	const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
	const i = Math.floor(Math.log(bytes) / Math.log(k));
	return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};
