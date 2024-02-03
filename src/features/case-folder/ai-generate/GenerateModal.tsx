import ModalDialog from "../../../components/Modal/ModalDialog";
import ModalSpecialButton from "../../../components/Buttons/ModalSpecialButton";

interface GenerateModalProps {
	closeModal: () => void;
}

function GenerateModal({ closeModal }: GenerateModalProps) {
	/* 
    workaround ¯\_(ツ)_/¯
    link opens new tab to jun's deployed app
	*/
	const handleLinkToJunCode = (): void => {
		const url =
			"https://astonishing-speculoos-022482.netlify.app/build/?fbclid=IwAR0WX0m2AIq2B9_6SqCbUZptki9w_TGw-CGJSeh443nOtDes8TTX_0yOwSk";
		window.open(url, "_blank");
		return;
	};

	// const fileElements = Array.map((item) => {
	// 	return (
	// 		<div className="h-20 w-[204px] px-2.5 py-1 bg-white rounded-lg">
	// 			<input type="checkbox" />
	// 		</div>
	// 	);
	// });

	return (
		<ModalDialog className="w-[768px]" closeModal={closeModal} enableBackdropClose={true}>
			<div id="modal-body" className="flex flex-col items-center justify-center w-full">
				<h1 className="text-white">Generate</h1>
				<p className="text-white">Select the documents you want to generate an argument for.</p>
				<div className="flex flex-row items-center self-start justify-center gap-2">
					<input id="select-all" type="checkbox" />
					<label htmlFor="select-all" className="text-white">
						Select all
					</label>
				</div>
				<div id="file-grid" className="grid grid-cols-3 gap-x-5 gap-y-6">
					<div className="h-20 w-[204px] px-2.5 py-1 bg-white rounded-lg">
						<input type="checkbox" />
					</div>
					<div className="h-20 w-[204px] px-2.5 py-1 bg-white rounded-lg">
						<input type="checkbox" />
					</div>
					<div className="h-20 w-[204px] px-2.5 py-1 bg-white rounded-lg">
						<input type="checkbox" />
					</div>
					<div className="h-20 w-[204px] px-2.5 py-1 bg-white rounded-lg">
						<input type="checkbox" />
					</div>
					<div className="h-20 w-[204px] px-2.5 py-1 bg-white rounded-lg">
						<input type="checkbox" />
					</div>
					<div className="h-20 w-[204px] px-2.5 py-1 bg-white rounded-lg">
						<input type="checkbox" />
					</div>
				</div>
				<ModalSpecialButton name="AI Argument Generation" type="button" onClick={handleLinkToJunCode} />
			</div>
		</ModalDialog>
	);
}

export default GenerateModal;
