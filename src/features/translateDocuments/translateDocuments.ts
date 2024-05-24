const translateDoc = async (fileName: string): Promise<string> => {
	const language = "en";
	const bucketName = process.env.REACT_APP_UPLOAD_BUCKET;
	const endpoint = process.env.REACT_APP_TRANSLATE_ENDPOINT;

	const inputUri = "gs://" + bucketName + "/" + fileName;
	const translatedDocPath = process.env.REACT_APP_TRANSLATED_DOCS;

	const body = {
		inputUri: inputUri,
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
		const translatedDoc = `${translatedDocPath}/${bucketName}_${noExtensionFileName}_${language}_translations.pdf`;

		return Promise.resolve(translatedDoc);
	} else return Promise.reject(res.error);
};

export default translateDoc;
