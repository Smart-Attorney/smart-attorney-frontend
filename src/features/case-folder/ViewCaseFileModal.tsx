import ModalButton from "../../components/Buttons/ModalButton";
import ModalDialog from "../../components/Modal/ModalDialog";

interface ViewCaseFileCardsProps {
	fileName: string;
	fileID: string;
	fileURL: string;
	closeModal: () => void;
}

function ViewCaseFileModal(props: ViewCaseFileCardsProps) {
	const { fileName, fileURL } = props;

	/**
	 * TODO:
	 * Find a way to display .docx files in webpage.
	 */

	return (
		<ModalDialog closeModal={props.closeModal}>
			<div id="modal-body" className="flex flex-col items-center gap-4">
				<h1 className="text-xl font-semibold text-white">{fileName}</h1>
				<div className="w-full h-full rounded-md bg-gray-50">
					<object height="100%" width="100%" data={fileURL}></object>
				</div>
				<ModalButton onClick={props.closeModal} name="Close" />
			</div>
		</ModalDialog>
	);
}

export default ViewCaseFileModal;
