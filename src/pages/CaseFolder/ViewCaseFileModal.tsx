import { getDownloadURL, ref } from "firebase/storage";
import storage from "../../services/firebase/firebase";
import { useState, useEffect } from "react";

interface CaseFileCardsProps {
	fileName: string | null;
	fileID: string | undefined;
	handleClickCloseViewCaseFile: () => void;
}

function ViewCaseFileModal(props: CaseFileCardsProps) {
	const [fileUrl, setFileUrl] = useState<string>();
	const { fileName, fileID } = props;
	const splitFileName = fileName!.split(".");
	const fileExt = splitFileName[splitFileName.length - 1];

	useEffect(() => {
		getFileFromCloud();
	}, []);

	const getFileFromCloud = async () => {
		try {
			const fileRef = ref(storage, `${fileExt}/${fileID}_${fileName}`);
			const url = await getDownloadURL(fileRef);
			setFileUrl(url);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="p-5 border border-black w-60 h-60" onClick={props.handleClickCloseViewCaseFile}>
			<h1>{fileName}</h1>
			<img src={fileUrl} />
		</div>
	);
}

export default ViewCaseFileModal;
