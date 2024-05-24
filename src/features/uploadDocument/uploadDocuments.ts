const uploadDocuments = async (files: File[]): Promise<string | string[]> => {
	const bucketName = process.env.REACT_APP_UPLOAD_BUCKET;
	const endpoint = process.env.REACT_APP_UPLOAD_ENDPOINT;

	const formData = new FormData();

	files.forEach((file) => {
		formData.append(file.name, file);
	});

	// console.log([...formData]);

	const response = await fetch(endpoint as string, {
		method: "POST",
		mode: "cors",
		body: formData,
	});

	const res = await response.json();

	if (response.status === 200) {
		// urls to the uploaded files
		const publicUrls = res.uploadedFileNames.map(
			(fileName: string) =>
				`https://storage.googleapis.com/${bucketName}/${fileName}`
		);

		return Promise.resolve(publicUrls);
	} else return Promise.reject(res.error);
};

export default uploadDocuments;
