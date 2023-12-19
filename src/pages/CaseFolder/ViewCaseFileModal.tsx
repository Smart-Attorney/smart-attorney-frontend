// const getFileFromCloud = async () => {
// 	try {
// 		const fileRef = ref(storage, `${fileExt}/${fileID}_${fileName}`);
// 		const url = await getDownloadURL(fileRef);
// 		setFileUrl([{ uri: url }]);
// 	} catch (error) {
// 		console.log(error);
// 	}
// };
// import { getDownloadURL, ref } from "firebase/storage";
// import storage from "../../services/firebase/firebase";
// import { useState, useEffect } from "react";
import DocViewer, { DocViewerRenderers, IDocument } from "@cyntler/react-doc-viewer";

interface CaseFileCardsProps {
	fileName: string | null;
	fileID: string | undefined;
	fileURL: string;
	handleClickCloseViewCaseFile: () => void;
}

function ViewCaseFileModal(props: CaseFileCardsProps) {
	const { fileName, fileURL } = props;

	const splitFileName = fileName!.split(".");
	const fileExt = splitFileName[splitFileName.length - 1];

	const splitUrl = fileURL.split("?alt=media&");
	const filePath = splitUrl[0];
	const accessToken = splitUrl[1];
	/**
	 * https://firebasestorage.googleapis.com/v0/b/smart-attorney-564b2.appspot.com/o/pdf%2FTtJawRx4sEnE1nMcqGuwB_dummy.pdf?alt=media&token=6ccd7e4f-940a-4d81-a72d-ea30a03c8dca
	 */

	const headers = {

	};

	const docs: IDocument[] = [
		{
			// uri: `${spliturl[0]}?alt=media`,
			uri: fileURL,
			fileType: fileExt,
			fileName: fileName!,
		},
	];

	return (
		<div className="p-5 rounded-lg min-w-fit h-fit bg-[#D9D9D9]">
			<div className="flex flex-col items-center gap-4">
				<h1 className="text-xl font-semibold bg-[#D9D9D9]">{fileName}</h1>
				<div className="bg-white rounded-md">
					<img className="w-80" src={fileURL} />
					<DocViewer
						documents={docs}
						requestHeaders={headers}
						prefetchMethod="GET"
						pluginRenderers={DocViewerRenderers}
					/>
				</div>
				<button
					className="w-40 py-2 font-semibold text-black bg-white border border-black rounded-md"
					type="button"
					onClick={props.handleClickCloseViewCaseFile}
				>
					Close
				</button>
			</div>
		</div>
	);
}

export default ViewCaseFileModal;
