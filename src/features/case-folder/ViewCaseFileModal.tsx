interface ViewCaseFileCardsProps {
	fileName: string;
	fileID: string;
	fileURL: string;
	onClick: () => void;
}

function ViewCaseFileModal(props: ViewCaseFileCardsProps) {
	const { fileName, fileURL } = props;

	/**
	 * TODO:
	 * Find a way to display .docx files in webpage.
	 */

	return (
		<div
			id="modal-backdrop"
			className="bg-[#00000040] h-screen w-[calc(100%-80px)] justify-center flex items-center top-0 absolute backdrop-blur-[2px]"
		>
			<div id="modal-container" className=" w-[768px] h-fit p-5 rounded-lg bg-white ">
				<div id="modal-contents" className="flex flex-col items-center w-full h-full gap-4">
					<h1 className="text-xl font-semibold bg-white">{fileName}</h1>
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

export default ViewCaseFileModal;
