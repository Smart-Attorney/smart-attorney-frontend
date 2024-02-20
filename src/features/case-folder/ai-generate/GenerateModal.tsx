import ModalSpecialButton from "../../../components/Buttons/ModalSpecialButton";
import ModalDialog from "../../../components/Modal/ModalDialog";
import fileExtractor from "../../../components/Pdf/FileExtractor";
import { CaseFileObj } from "../../../utils/types";

interface GenerateModalProps {
	closeModal: () => void;
	files: CaseFileObj[];
}

function GenerateModal({ closeModal }: GenerateModalProps) {
	const parseSelectedFiles = (files: FileList): string => {
		let chatGptInput = "";
		for (let i = 0; i < files.length; i++) {
			const fileString = fileExtractor(files[i]);

			fileString.then((res) => chatGptInput + res);
		}

		return chatGptInput;
	};

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

	const mockArray = ["abc", "def", "ghi", "jkl", "mno", "pqr"];

	return (
		<ModalDialog
			className="w-[768px]"
			closeModal={closeModal}
			enableBackdropClose={true}
		>
			{/* Contains all the elements of the body. */}
			<div
				id="modal-body"
				className="flex flex-col items-center justify-center w-full pb-4 gap-7 px-14"
			>
				{/* Contains the header and subtext. */}
				<div className="flex flex-col items-center">
					<h1 className="text-xl text-white">Generate</h1>
					<p className="text-white">
						Select the documents you want to generate an argument for.
					</p>
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
						{mockArray.map((item) => (
							<div className="h-20 w-[204px] px-2.5 py-1.5 bg-white rounded-[10px] cursor-pointer">
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
