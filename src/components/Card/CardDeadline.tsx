import { Format } from "../../utils/format";

interface CardDeadlineProps {
	id?: string;
	deadline: number;
}

function CardDeadline({ id, deadline }: CardDeadlineProps) {
	return (
		<div
			id={id}
			className="min-w-max bg-[#FB3E3E80] rounded-full px-2.5 py-1"
			style={{ display: deadline === 0 ? "none" : "block" }}
		>
			<p id={id} className="text-xs">
				Deadline: {Format.dateForCardDisplay(deadline)}
			</p>
		</div>
	);
}

export default CardDeadline;
