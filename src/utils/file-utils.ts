import * as img from "../assets/file-type";

export class FileUtils {
	/**
	 * Byte conversion function source:
	 * https://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript
	 */
	static formatBytes(bytes: number, decimals = 1): string {
		if (!+bytes) return "0 Bytes";
		const k = 1000;
		const dm = decimals < 0 ? 0 : decimals;
		const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
	}

	static getFileTypeImage = (fileType: string) => {
		switch (fileType) {
			case "doc":
				return img.DocFile;
			case "docx":
				return img.DocxFile;
			case "jpg":
				return img.JpgFile;
			case "mp3":
				return img.Mp3File;
			case "mp4":
				return img.Mp4File;
			case "pdf":
				return img.PdfFile;
			case "png":
				return img.PngFile;
			case "txt":
				return img.TxtFile;
			default:
				return img.UnknownFile;
		}
	};
}
