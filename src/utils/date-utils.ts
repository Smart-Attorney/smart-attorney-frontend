export class DateUtils {
	private static convertUnixDateToStringDate(unixDate: number): string[] {
		if (unixDate === 0 || unixDate === null) {
			return ["", "", ""];
		}
		const date = new Date(unixDate);
		let year = date.getUTCFullYear().toString();
		let month = (date.getUTCMonth() + 1).toString();
		let day = date.getUTCDate().toString();
		month = month.length === 1 ? "0" + month : month;
		day = day.length === 1 ? "0" + day : day;
		return [year, month, day];
	}

	/**
	 * HTML Date Picker Input element stores selected date
	 * value in the format of (year/month/day).
	 * This function formats the date to be displayed in the
	 * desired format of (mm/dd/yy).
	 */
	static formatToMDY(unixDate: number): string {
		let [year, month, day] = this.convertUnixDateToStringDate(unixDate);
		if (year === "" || month === "" || day === "") {
			return "";
		}
		year = year.substring(2, 4);
		const formattedDate = `${month}/${day}/${year}`;
		return formattedDate;
	}

	/**
	 * This function formats the date to be displayed in the
	 * desired format of (yyyy-mm-dd).
	 */
	static formatToYMD(unixDate: number): string {
		let [year, month, day] = this.convertUnixDateToStringDate(unixDate);
		if (year === "" || month === "" || day === "") {
			return "";
		}
		const formattedDate = `${year}-${month}-${day}`;
		return formattedDate;
	}
}
