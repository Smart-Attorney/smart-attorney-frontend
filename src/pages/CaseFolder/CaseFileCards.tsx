import { FileItem } from "../../utils/types";

interface CaseFileCardsProps {
	files: FileItem[] | undefined;
	handleClickViewCaseFile: (event: React.MouseEvent<HTMLParagraphElement>) => void;
}

function CaseFileCards(props: CaseFileCardsProps) {
	return (
		<div className="grid gap-8 min-[2300px]:grid-cols-6 min-[1900px]:grid-cols-5 min-[1500px]:grid-cols-4 min-[1100px]:grid-cols-3 min-[650px]:grid-cols-2">
			{props.files?.map((file) => {
				return (
					<div
						className="bg-[#D9D9D9] h-64 w-64 rounded-3xl py-4 pl-12 flex flex-col justify-between"
						key={file.id}
					>
						<h1>{file.status}</h1>

						<p
							className="mb-8 font-semibold cursor-pointer hover:text-blue-500"
							id={file.id}
							onClick={props.handleClickViewCaseFile}
						>
							{file.name}
						</p>
					</div>
				);
			})}
		</div>
	);
}

export default CaseFileCards;
