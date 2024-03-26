import { Format } from "../../utils/format";

interface CardDeadlineProps {
	id?: string;
	navLabel?: string;
	deadline: number;
}

function CardDeadline({ id, navLabel, deadline }: CardDeadlineProps) {
	return (
		<div
			id={id}
			aria-label={navLabel}
			className="min-w-max bg-[#FB3E3E80] rounded-full px-2.5 py-1"
			style={{ display: deadline === 0 ? "none" : "block" }}
		>
			<p id={id} aria-label={navLabel} className="text-xs">
				Deadline: {Format.dateForCardDisplay(deadline)}
			</p>
		</div>
	);
}

export default CardDeadline;
