import ModalButton from "../../components/Buttons/ModalButton";
import ModalDialog from "../../components/Modal/ModalDialog";

interface ViewDocumentModalProps {
	caseId: string;
	documentName: string;
	documentId: string;
	documentUrl: string;
	closeModal: () => void;
}

function ViewDocumentModal(props: ViewDocumentModalProps) {
	const { documentName, documentUrl } = props;

	/*
	 * TODO:
	 * Find a way to display .docx files in webpage.
	 * Dynamically render proper html element based on file type.
	 * <img> for picture
	 * <iframe> for html
	 * <video> for video
	 * <audio> for audio
	 * <object> for web page, picture, media player, plug-in app
	 */

	return (
		<ModalDialog className="w-[768px] h-[512px]" closeModal={props.closeModal} enableBackdropClose={true}>
			<div id="modal-body" className="flex flex-col items-center gap-4 w-[80%] h-full">
				<h1 className="text-xl font-semibold text-white">{documentName}</h1>
				<div className="w-full h-full rounded-md bg-gray-50">
					<object data={documentUrl} className="w-full h-full"></object>
				</div>
				<ModalButton name="Close" type="button" className="h-16 border-[5px]" onClick={props.closeModal} />
			</div>
		</ModalDialog>
	);
}

export default ViewDocumentModal;
