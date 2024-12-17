import { useContext, useState } from "react";
import ModalSpecialButton from "../../../components/Buttons/ModalSpecialButton";
import ModalDialog from "../../../components/Modal/ModalDialog";
import fileExtractor from "../../../components/Pdf/FileExtractor";
import { CurrentUserContext, CurrentUserContextType } from "../../../providers/CurrentUserProvider";
import { Firebase } from "../../../services/cloud-storage/firebase";
import { Document } from "../../../types/api";
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

import { IncomingMessage } from 'http';
import https from 'https';
import path from 'path';
import fs from 'fs';
import extractTextFromPdf from "../../../utils/pdfjs";


// temp

type Message = {
	role: "User"  | "assistant";
	content: string
}
interface GenerateModalProps {
	closeModal: () => void;
	documents: Document[];
	caseId: string;
}

function GenerateModal({ closeModal, documents, caseId }: GenerateModalProps) {
	const { getCurrentUser } = useContext(CurrentUserContext) as CurrentUserContextType;
	const { id } = getCurrentUser();
	const parseSelectedFiles = async (files: FileList): Promise<string> => {
		let chatGptInput = "";
		for (let i = 0; i < files.length; i++) {
			const fileString = await fileExtractor(files[i]);  // Await the result of each Promise
			chatGptInput += fileString;  // Concatenate each file's content to chatGptInput
		}
		return chatGptInput;
	};

	/*
	workaround ¯\_(ツ)_/¯
	link opens new tab to jun's deployed app
	*/
	const handleLinkToJunCode = (): void => {
		if (documents.length === 0) {
			alert("Empty documents array, cannot use this without a document.");
			return;
		}
	
		// Call Firebase.getFileById which returns a Promise
		Firebase.getFileById(id, caseId, documents[0].id)
			.then(async (docURL) => {
				// Check if the URL was retrieved successfully
				if (!docURL) {
					alert("Could not retrieve document URL.");
					return;
				}
				// extractTextFromPdf(docURL)
				// 	.then((text) => {
				// 		if (!text) {
				// 		alert("Text variable is empty");
				// 		}
				// 		alert(text.toString());
				// 	})
				// 	.catch((error) => {
				// 		console.error("Error extracting text from PDF", error);
				// 		alert("Failed to extract text from PDF");
				// 	});

				// temporary fix
				// ====================================================================================
				const [message] = useState("")
				const response = await fetch("/api/chat", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ message }),
				})
				alert(response)
				// ====================================================================================
				// const pages = "";
				// // PDF document password. Leave empty for unprotected documents.
				// const password = "";
				// // Destination JSON file name
				// const destinationFile = "./result.json";
				// Pass the docURL to processDocument
				// processDocument(API_KEY, docURL, password, pages, destinationFile);
	
				// Optionally open an external link
				const url = "https://astonishing-speculoos-022482.netlify.app/build/";
				window.open(url, "_blank");
			})
			.catch((error) => {
				console.error("Error retrieving document URL:", error);
			});
	};
	
	// async function processDocument(apiKey: string, docURL: string, password: string, pages: string, destinationFile: string) {
	// 	try {
	// 		// Step 1: Skip the upload and directly convert the file using the URL
	// 		convertPdfToJson(apiKey, docURL, password, pages, destinationFile);
	// 	} catch (error) {
	// 		console.error('Error processing document:', error);
	// 	}
	// }
	
	// function convertPdfToJson(apiKey: string, uploadedFileUrl: string, password: string, pages: string, destinationFile: string): void {
	// 	const queryPath = '/v1/pdf/convert/to/json';
	
	// 	const jsonPayload = JSON.stringify({
	// 		name: path.basename(destinationFile),
	// 		password,
	// 		pages,
	// 		url: uploadedFileUrl  // Use docURL directly
	// 	});
	
	// 	const reqOptions = {
	// 		host: 'api.pdf.co',
	// 		method: 'POST',
	// 		path: queryPath,
	// 		headers: {
	// 			'x-api-key': apiKey,
	// 			'Content-Type': 'application/json',
	// 			'Content-Length': Buffer.byteLength(jsonPayload, 'utf8')
	// 		}
	// 	};
		
	// 	const postRequest = https.request(reqOptions, (response: IncomingMessage) => {
	// 		let responseData = '';
	// 		response.on('data', (chunk) => {
	// 			responseData += chunk;
	// 		});
	
	// 		response.on('end', () => {
	// 			const data = JSON.parse(responseData);
	// 			if (!data.error) {
	// 				const file = fs.createWriteStream(destinationFile);
	// 				https.get(data.url, (response2: IncomingMessage) => {
	// 					response2.pipe(file).on('close', () => {
	// 						console.log(`Generated JSON file saved as "${destinationFile}"`);
	// 					});
	// 				});
	// 			} else {
	// 				console.log(`convertPdfToJson(): ${data.message}`);
	// 			}
	// 		});
	// 	}).on('error', (e: Error) => {
	// 		console.log(`convertPdfToJson(): ${e.message}`);
	// 	});
	
	// 	postRequest.write(jsonPayload);
	// 	postRequest.end();
	// }
	
	const mockArray = ["abc", "def", "ghi", "jkl", "mno", "pqr"];

	return (
		<ModalDialog className="w-[768px]" closeModal={closeModal} enableBackdropClose={true}>
			{/* Contains all the elements of the body. */}
			<div id="modal-body" className="flex flex-col items-center justify-center w-full pb-4 gap-7 px-14">
				{/* Contains the header and subtext. */}
				<div className="flex flex-col items-center">
					<h1 className="text-xl text-white">Generate</h1>
					<p className="text-white">Select the documents you want to generate an argument for.</p>
				</div>

				{/* Contains the select-all checkbox and document grid. */}
				<div className="flex flex-col gap-4">
					{/* Contains the select-all checkbox and label. */}
					<div className="flex flex-row items-center self-start justify-center gap-2 cursor-pointer">
						<input id="select-all" type="checkbox" className="cursor-pointer" />
						<label htmlFor="select-all" className="text-white cursor-pointer">
							Select all
						</label>
					</div>

					{/* Contains the document grid. */}
					<div id="file-grid" className="grid grid-cols-3 gap-x-5 gap-y-6">
						{mockArray.map((item, index) => (
							<div key={index} className="h-20 w-[204px] px-2.5 py-1.5 bg-white rounded-[10px] cursor-pointer">
								<div className="flex flex-row w-full gap-2 cursor-pointer">
									<input type="checkbox" className="cursor-pointer" />
									<label className="text-sm cursor-pointer">{item}</label>
								</div>
							</div>
						))}
					</div>
				</div>

				<ModalSpecialButton
					name="AI Argument Generation"
					type="button"
					className="h-[68px]"
					onClick={handleLinkToJunCode}
				/>
			</div>
		</ModalDialog>
	);
}

export default GenerateModal;
