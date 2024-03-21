import { useEffect, useRef } from "react";
import { Format } from "../../utils/format";
import { DashboardFolderCardObj } from "../../utils/types";

interface CardHeaderProps {
	id?: string;
	caseFolder: DashboardFolderCardObj;
	deleteLabel?: (event: React.MouseEvent<HTMLParagraphElement>) => void;
}

function CardHeader({ id, caseFolder, deleteLabel }: CardHeaderProps) {
	const pillContainer = useRef<HTMLDivElement>(null);

	// Stops background scroll when user mouse wheels while hovering pill labels
	useEffect(() => {
		pillContainer.current?.addEventListener("wheel", preventDefaultScroll, { passive: false });
		return () => {
			pillContainer.current?.removeEventListener("wheel", preventDefaultScroll);
		};
	}, []);

	const preventDefaultScroll = (event: { preventDefault: () => void }) => {
		event.preventDefault();
	};

	/**
	 * Allows vertical scroll wheel behavior to perform horizontal scroll
	 * Source: https://stackoverflow.com/questions/61099088/how-to-horizontally-scroll-a-table-with-mouse-wheel-in-react?rq=3
	 */
	const handleMouseWheelScroll = (event: React.WheelEvent<HTMLDivElement>) => {
		const pillContainerScrollPosition = pillContainer.current ? pillContainer.current?.scrollLeft : 0;
		pillContainer.current?.scrollTo({
			top: 0,
			left: pillContainerScrollPosition + event.deltaY,
		});
	};

	return (
		<div id={id} className="flex flex-col w-[230px] h-[72px] justify-between">
			{/* Deadline and Labels */}
			<div
				id={id}
				ref={pillContainer}
				className="flex flex-row overflow-x-hidden overflow-y-hidden custom-scrollbar hover:overflow-x-auto gap-x-3 gap-y-1"
				onWheel={(event) => handleMouseWheelScroll(event)}
			>
				{/* Deadline */}
				{caseFolder.deadline !== 0 && (
					<div id={id} className="min-w-max bg-[#FB3E3E80] rounded-full px-2.5 py-1">
						<p id={id} className="text-xs">
							Deadline: {Format.dateForCardDisplay(caseFolder.deadline)}
						</p>
						{/* TODO: what is the case folder status for */}
						{/* folder status is for open or closed */}
					</div>
				)}

				{/* Labels */}
				{caseFolder.labels.map((label) => (
					<div key={label.id} id={label.id}>
						<p
							className="w-fit text-xs px-2.5 py-1 text-black bg-[#FFCC67] rounded-full cursor-pointer"
							id={caseFolder.id}
							onClick={deleteLabel}
						>
							{label.name}
						</p>
					</div>
				))}
			</div>

			{/* Name */}
			<p id={id} className="text-sm cursor-pointer line-clamp-1 w-fit hover:text-blue-500">
				{caseFolder.name}
			</p>
		</div>
	);
}

export default CardHeader;
