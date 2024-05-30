import { CaseFolderLabelObj } from "../../utils/types";

interface CardLabelsProps {
	id?: string;
	navLabel?: string;
	deleteLabel?: (event: React.MouseEvent<HTMLParagraphElement>) => void;
	labels: CaseFolderLabelObj[];
}

function CardLabels({ deleteLabel, labels }: CardLabelsProps) {
	return (
		<>
			{labels.map((label) => {
				return (
					<div
						key={label.id}
						id={label.id}
						// if uncommented, will allow navigation into folder when clicking on label
						// aria-label={navLabel}
						className="px-2.5 py-1 w-fit bg-[#FFCC67] rounded-full cursor-pointer"
						onDoubleClick={deleteLabel}
					>
						<p className="text-xs text-black " id={label.id} onDoubleClick={deleteLabel}>
							{label.name}
						</p>
					</div>
				);
			})}
		</>
	);
}

export default CardLabels;
