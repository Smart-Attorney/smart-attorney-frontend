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
						// if this is uncommented, will cause navigation into folder when trying to delete label
						// aria-label={navLabel}
						className="px-2.5 py-1 w-fit bg-[#FFCC67] rounded-full cursor-pointer"
						onClick={deleteLabel}
					>
						<p className="text-xs text-black " id={label.id} onClick={deleteLabel}>
							{label.name}
						</p>
					</div>
				);
			})}
		</>
	);
}

export default CardLabels;
