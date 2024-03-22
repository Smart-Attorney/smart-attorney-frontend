import { CaseFolderLabelObj } from "../../utils/types";

interface CardLabelsProps {
	id?: string;
	deleteLabel?: (event: React.MouseEvent<HTMLParagraphElement>) => void;
	labels: CaseFolderLabelObj[];
}

function CardLabels({ id, deleteLabel, labels }: CardLabelsProps) {
	return (
		<>
			{labels.map((label) => {
				return (
					<div key={label.id} id={id}>
						<p
							className="w-fit text-xs px-2.5 py-1 text-black bg-[#FFCC67] rounded-full cursor-pointer"
							id={label.id}
							onClick={deleteLabel}
						>
							{label.name}
						</p>
					</div>
				);
			})}
		</>
	);
}

export default CardLabels;
