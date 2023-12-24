interface CaseFileCardsProps {
	fileName: string | null;
	fileID: string | undefined;
	fileURL: string;
	onClick: () => void;
}

function CaseFileModal(props: CaseFileCardsProps) {
	const { fileName, fileURL } = props;

	/**
	 * TODO:
	 * Find a way to display .docx files in webpage.
	 */

	return (
		<div
			id="modal-overlay"
			className="absolute flex justify-center items-center h-screen w-screen bg-[rgba(128,128,128,0.5)]"
		>
			<div id="modal" className=" w-[80%] h-[80%] p-5 rounded-lg bg-[#D9D9D9] ">
				<div id="modal-contents" className="flex flex-col items-center w-full h-full gap-4">
					<h1 className="text-xl font-semibold bg-[#D9D9D9]">{fileName}</h1>
					<div className="w-full h-full bg-white rounded-md">
						<object height="100%" width="100%" data={fileURL}></object>
					</div>
					<button
						className="w-40 py-2 font-semibold text-black bg-white border border-black rounded-md"
						type="button"
						onClick={props.onClick}
					>
						Close
					</button>
				</div>
			</div>
		</div>
	);
}

export default CaseFileModal;
