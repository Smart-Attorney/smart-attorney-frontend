import { CaseFileObj } from "../../utils/types";

interface CaseFileProps {
	uploadedCaseFiles: CaseFileObj[];
}

function UploadedFileCards(props: CaseFileProps) {
	return (
		/**
		 * TODO:
		 * NewCase page should be in charge of how these cards are displayed.
		 * Also rename this to CaseFileCard for clarity.
		 */
		<div className="grid gap-8 min-[2300px]:grid-cols-6 min-[1900px]:grid-cols-5 min-[1500px]:grid-cols-4 min-[1100px]:grid-cols-3 min-[650px]:grid-cols-2">
			{props.uploadedCaseFiles.map((file) => (
				<div
					className="bg-[#D9D9D9] h-64 w-64 rounded-3xl py-4 pl-12 flex flex-col justify-between"
					key={file.id}
				>
					<h1>{file.status}</h1>

					<p className="mb-8">{file.name}</p>
				</div>
			))}
		</div>
	);
}

export default UploadedFileCards;
