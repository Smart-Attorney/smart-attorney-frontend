import * as img from "../assets/file-type";

export const getFileTypeImg = (fileType: string) => {
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
