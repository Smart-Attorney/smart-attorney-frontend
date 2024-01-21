import doc from "../assets/file-type/doc.png";
import docx from "../assets/file-type/docx.png";
import jpg from "../assets/file-type/jpg.png";
import mp3 from "../assets/file-type/mp3.png";
import mp4 from "../assets/file-type/mp4.png";
import pdf from "../assets/file-type/pdf.png";
import png from "../assets/file-type/png.png";
import txt from "../assets/file-type/txt.png";
import unknown from "../assets/file-type/unknown.png";

const getFileTypeImg = (fileType: string) => {
	switch (fileType) {
		case "doc":
			return doc;
		case "docx":
			return docx;
		case "jpg":
			return jpg;
		case "mp3":
			return mp3;
		case "mp4":
			return mp4;
		case "pdf":
			return pdf;
		case "png":
			return png;
		case "txt":
			return txt;
		default:
			return unknown;
	}
};

export { getFileTypeImg };
