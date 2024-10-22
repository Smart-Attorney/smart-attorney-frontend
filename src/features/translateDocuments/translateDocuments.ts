function bufferToBlob(buffer: Buffer, mimeType: string) {
	return new Blob([buffer], { type: mimeType });
}

function bufferToFile(buffer: Buffer, fileName: string, mimeType: string) {
	const blob = bufferToBlob(buffer, mimeType);
	return new File([blob], fileName, { type: mimeType });
}

const translateDoc = async (
	fileName: string
): Promise<{ file: File; translatedDocUrl: string }> => {
	const language = "en";
	const uploadedFilesBucket = process.env.REACT_APP_UPLOAD_BUCKET;
	const translatedFilesBucket = process.env.REACT_APP_TRANSLATED_BUCKET;
	const endpoint = process.env.REACT_APP_TRANSLATE_ENDPOINT;

	const inputUri = "gs://" + uploadedFilesBucket + "/" + fileName;
	const outputUriPrefix = "gs://" + translatedFilesBucket + "/";
	const translatedDocPath = process.env.REACT_APP_TRANSLATED_DOCS;

	const body = {
		inputUri: inputUri,
		outputUriPrefix: outputUriPrefix,
	};

	const response = await fetch(endpoint as string, {
		method: "POST",
		mode: "cors",
		headers: {
			"content-type": "application/json",
		},
		body: JSON.stringify(body),
	});
	const res = await response.json();

	if (response.status === 200) {
		const noExtensionFileName = fileName.replaceAll(".pdf", "");
		const translatedDoc = `${translatedDocPath}/${uploadedFilesBucket}_${noExtensionFileName}_${language}_translations.pdf`;

		const buffer = res.documentTranslation.byteStreamOutputs[0];
		const file = bufferToFile(buffer, fileName, "application/pdf");

		return Promise.resolve({ file: file, translatedDocUrl: translatedDoc });
	} else return Promise.reject(res.error);
};

export default translateDoc;
