import {
	DocFile,
	DocxFile,
	JpgFile,
	Mp3File,
	Mp4File,
	PdfFile,
	PngFile,
	TxtFile,
	UnknownFile,
} from "../assets/file-type";

const getFileTypeImg = (fileType: string) => {
	switch (fileType) {
		case "doc":
			return DocFile;
		case "docx":
			return DocxFile;
		case "jpg":
			return JpgFile;
		case "mp3":
			return Mp3File;
		case "mp4":
			return Mp4File;
		case "pdf":
			return PdfFile;
		case "png":
			return PngFile;
		case "txt":
			return TxtFile;
		default:
			return UnknownFile;
	}
};

export { getFileTypeImg };
