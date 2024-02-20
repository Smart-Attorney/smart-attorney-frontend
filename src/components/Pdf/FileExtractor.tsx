// import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
// import { PDFDocument } from "pdfjs-dist";
// import "core-js/stable"; // Import the core-js polyfills
// import "regenerator-runtime/runtime"; // If async/await support is required
import "buffer"; // Import the 'buffer' polyfill
import * as pdfjs from "pdfjs-dist";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
// import { getTextExtractor } from "office-text-extractor";

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   'pdfjs-dist/build/pdf.worker.min.js',
//   import.meta.url,
// ).toString();

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

// extract the contents of a file as a string
const fileExtractor = (file: File): Promise<string> => {
	return new Promise(() => {
		if (file.type === "application/pdf") {
			//It is important that you use the file and not the filepath (The file path won't work because of security issues)
			const fileReader = new FileReader();

			fileReader.onload = function () {
				if (this.result !== null) {
					const typedarray = new Uint8Array(this.result as ArrayBuffer);

					//replaced the old function with the new api
					const loadingTask = pdfjs.getDocument(typedarray);
					loadingTask.promise.then((pdf) => {
						// The document is loaded here...
						const maxPages = pdf._pdfInfo.numPages;
						const countPromises = []; // collecting all page promises
						for (let j = 1; j <= maxPages; j++) {
							const page = pdf.getPage(j);

							const txt = "";
							countPromises.push(
								page.then(function (page) {
									// add page promise
									const textContent = page.getTextContent();
									return textContent.then(function (text) {
										// return content promise
										return text.items
											.map(function (s) {
												if ("str" in s) return s.str;
											})
											.join(""); // value page text
									});
								})
							);
						}
						// Wait for all pages and join text
						return Promise.all(countPromises).then((texts) => texts);
					});
				}
			};
			//Step 3:Read the file as ArrayBuffer
			fileReader.readAsArrayBuffer(file);
		} else return Promise.reject("App currently only accepts pdfs");

		// else if (
		// 	file.type ===
		// 	"application/vnd.openxmlformats-officedocument.wordprocessingml.document"
		// ) {
		// 	const extractor = getTextExtractor();
		// 	const url =
		// 		"https://raw.githubusercontent.com/gamemaker1/office-text-extractor/rewrite/test/fixtures/docs/pptx.pptx";
		// 	const text = extractor.extractText({ input: url, type: "url" });
		// 	const fileReader = new FileReader();
		// 	fileReader.onload = function () {};
		// }
	});
};

export default fileExtractor;
